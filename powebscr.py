#!/usr/bin/env python3
#-*- coding: utf-8 -*-
"Powerful Web Screenshot"
import os
import json
import subprocess
import sys
import tempfile
from pathlib import Path
from subprocess import PIPE, call, check_call, check_output

HOST, PORT = "127.0.0.1", 12345

def main():
    if call(["node", "-v"], stdout=PIPE) != 0:
        sys.exit("error: invaild nodejs (node -v return non-zero exitcode)")
    
    if not os.environ.get("CLOUDINARY_URL", "").startswith("cloudinary://"):
        # just check for upload.js
        sys.exit("error: invaild cloudinary url (env CLOUDINARY_URL is unset or invaild)")

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
        
        check_output(["npm", "run", "screenshot"])
        
        output = check_output(["node", "upload.js", str(imgpath)])
        upload_info = json.loads(output.decode())
        
        print(upload_info['secure_url'])
    finally:
        if server:
            server.terminate()
            if server.wait(timeout=1) is None:
                server.kill()
        if imgpath.exists():
            imgpath.unlink()

if __name__== "__main__":
    main()

