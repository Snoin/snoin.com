import functools
import pathlib

from click import Path, echo, group, option

from .config import load
from .web.app import app


def load_config(func):
    @functools.wraps(func)
    def internal(*args, **kwargs):
        filename = kwargs.pop('config')
        if filename is None:
            echo('--config 옵션을 주셔야 합니다.', err=True)
            raise SystemError(1)

        config = load(pathlib.Path(filename))
        app.config.update(config)
        return func(*args, **kwargs)

    decorator = option('--config', '-c', type=Path(exists=True))

    return decorator(internal)


@group()
def cli():
    """Command line interface for snoin.com website."""


@cli.command()
@option('--host', '-h')
@option('--port', '-p', type=int)
@option('--threaded', is_flag=True)
@option('--processes', type=int, default=1)
@option('--passthrough-errors', is_flag=True)
@option('--debug/--no-debug', '-d/-D', default=None)
@option('--reload/--no-reload', '-r/-R', default=None)
@load_config
def runserver(host, port, threaded, processes,
              passthrough_errors, debug, reload):
    if debug is None:
        debug = app.debug
    if reload is None:
        reload = app.debug

    app.run(host=host,
            port=port,
            debug=debug,
            use_debugger=debug,
            use_reloader=reload,
            threaded=threaded,
            processes=processes,
            passthrough_errors=passthrough_errors)


main = cli
