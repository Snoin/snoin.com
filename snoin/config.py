import pathlib
import runpy
import sys


def error(msgfmt, *args):
    msg = msgfmt.format(*args)
    print(msg, file=sys.stderr)
    raise SystemError(1)


def load(file: pathlib.Path) -> dict:
    if not file.exists():
        error('존재하지 않는 파일')
    if not file.is_file():
        error('파일이 아님')
    if file.suffix != '.py':
        error('python 파일만 처리 가능')

    config = runpy.run_path(file.name, run_name="<snoin.config>")
    if not config.get("SNOIN_CONFIG"):
        error('snoin config 파일만 처리 가능 (SNOIN_CONFIG is unset)')

    return config
