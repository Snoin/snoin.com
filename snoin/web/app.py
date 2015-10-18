import json

from flask import Flask, render_template
from requests import get
from werkzeug.contrib.cache import SimpleCache

__all__ = 'app',

app = Flask(__name__, template_folder='templates')
cache = SimpleCache()


@app.route('/')
def index():
    return render_template('index.html')


@app.context_processor
def template_processor():
    def get_gravatar_image(username: str) -> str:
        url = cache.get(username)
        if url is None:
            raw = get('http://en.gravatar.com/{}.json'.format(username)).text
            data = json.loads(raw)
            url = 'https://secure.gravatar.com/avatar/{}?size=265'.format(
                data['entry'][0]['hash']
            )
            cache.set(username, url)
            return url

    return dict(get_gravatar_image=get_gravatar_image)
