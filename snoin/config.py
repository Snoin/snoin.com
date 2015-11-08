import pathlib
import sys


def load(file: pathlib.Path) -> dict:
    if not file.exists():
        print('존재하지 않는 파일', file=sys.stderr)
        raise SystemError(1)
    if not file.is_file():
        print('파일이 아님', file=sys.stderr)
        raise SystemError(1)
    if file.suffix != '.py':
        print('python 파일만 처리 가능', file=sys.stderr)
        raise SystemError(1)

    config = {}

    with file.open() as f:
        exec(compile(f.read(), file.name, 'exec'), config)

    return config
