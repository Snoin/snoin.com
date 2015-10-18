import json

from flask import Flask, render_template
from requests import get

__all__ = 'app',

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
    return render_template('index.html')


@app.context_processor
def template_processor():
    def get_gravatar_image(username: str) -> str:
        raw = get('http://en.gravatar.com/{}.json'.format(username)).text
        data = json.loads(raw)
        return 'https://secure.gravatar.com/avatar/{}?size=265'.format(
            data['entry'][0]['hash']
        )

    return dict(get_gravatar_image=get_gravatar_image)
