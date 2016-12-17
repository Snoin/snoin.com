from email.headerregistry import Address
import pathlib
import sys

import toml


def error(msgfmt, *args):
    msg = msgfmt.format(*args)
    print(msg, file=sys.stderr)
    raise SystemExit(1)


def load(file: pathlib.Path) -> dict:
    if not file.exists():
        error('존재하지 않는 파일')
    if not file.is_file():
        error('파일이 아님')
    if not file.match('*.config.toml'):
        error('.config.toml 파일만 처리 가능')

    config = toml.load(file.name)
    if not config.get("SNOIN_CONFIG"):
        error('snoin config 파일만 처리 가능 (SNOIN_CONFIG is unset)')

    mail_listeners = config.get('MAIL_LISTENERS')
    if mail_listeners:
        config['MAIL_LISTENERS'] = []
        for listener in mail_listeners:
            config['MAIL_LISTENERS'].append(
                Address(listener['name'], listener['email'])
            )

    return config
