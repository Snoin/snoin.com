from click import group, option

from .web.app import app


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
