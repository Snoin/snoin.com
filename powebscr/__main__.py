#!/usr/bin/env python3
#-*- coding: utf-8 -*-
"Powerful Web Screenshot"
import os
import json
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from subprocess import PIPE, call, check_call, check_output

HOST, PORT = "127.0.0.1", 12345

def main():
    # for node_modules...
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))

    if call(["node", "-v"], stdout=PIPE) != 0:
        sys.exit("error: invaild nodejs (node -v return non-zero exitcode)")
    
    CLOUDINARY = os.environ.get("CLOUDINARY_URL", "")
    if not CLOUDINARY.startswith("cloudinary://"):
        # just check for upload.js
        sys.exit("error: invaild cloudinary url (env CLOUDINARY_URL is unset or invaild, {!r}...)".format(CLOUDINARY[:16]))

    # TODO: require custom port?
    server = None
    imgpath = Path(tempfile.mktemp(".png"))
    
    os.environ["POWEBSCR_HOMEURL"] = "http://{host}:{port}/".format(host=HOST, port=PORT)
    os.environ["POWEBSCR_IMGPATH"] = str(imgpath)
    # TODO: setup filename(public_id) based on git brench name and version

    try:
        server = subprocess.Popen([
            "snoin-web", "runserver",
            "--config", "cfg.py.example.py",
            "--host", HOST,
            "--port", str(PORT),
        ])
        
        # wait for starting web server
        time.sleep(1)
        if server.poll() is not None:
            sys.exit("error: starting web server is failed (exitcode = {}".format(server.returncode))
            
        # TODO: dynamic viewport support
        # TODO: path is hardcoded.
        #check_output(["npm", "run", "screenshot"])
        check_output(["./powebscr/phantomjs", "./powebscr/screenshot.js"])
        
        output = check_output(["node", "./powebscr/upload.js", str(imgpath)])
        upload_info = json.loads(output.decode())
        
        error_info = upload_info.get("error")
        if error_info:
            sys.exit("error: while uploading screenshot; {}".format(error_info.get("message")))
        
        secure_url = upload_info.get('secure_url')
        assert secure_url, "upload_info['secure_url'] is empty"
        
        print(secure_url)
    finally:
        if server:
            server.terminate()
            if server.wait(timeout=1) is None:
                server.kill()
        if imgpath.exists():
            imgpath.unlink()

if __name__== "__main__":
    main()

