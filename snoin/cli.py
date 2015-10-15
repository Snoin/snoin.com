from click import group

from .web.app import app


@group()
def cli():
    """Command line interface for snoin.com website."""


@cli.command()
def runserver():
    app.debug = True
    app.run()

main = cli
