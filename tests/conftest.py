from email.headerregistry import Address

import pytest

from snoin.web.app import app


@pytest.fixture()
def fx_flask_app():
    app.config.update({
        'SECURE_KEY': 'SNOIN',
        'SMTP_ID': 'snoin',
        'SMTP_PASSWORD': 'super_secret!',
        'MAIL_LISTENERS': [Address('홍길동', 'no-reply@snoin.com')],
    })
    return app


@pytest.fixture()
def fx_flask_client(fx_flask_app):
    return fx_flask_app.test_client()
