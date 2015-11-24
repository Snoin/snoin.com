import contextlib
import json
import smtplib

from flask import url_for
from snoin.web.app import app


def get_url(endpoint, **kwargs):
    with app.test_request_context():
        return url_for(endpoint, **kwargs)


def test_name_field_blank(fx_flask_client):
    """이름(name) 필드가 비었는지를 검사합니다.

    필수 필드가 비어있는 모든 경우의 수를 시도해봅니다.

    """
    data = dict()
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '이름을 적어주세요'

    data['email'] = 'test@snoin.com'
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '이름을 적어주세요'

    data['message'] = '상담받고 싶습니다. 연락 주세요.'
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '이름을 적어주세요'

    del data['email']
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '이름을 적어주세요'


def test_email_field_blank(fx_flask_client):
    """이메일(email) 필드가 비었는지를 검사합니다.

    이름 필드를 제외한 필수 필드가 비어있는 모든 경우의 수를 시도해봅니다.

    """
    data = dict(name='홍길동')
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '메일주소를 적어주세요'

    data['message'] = '메일주소를 적어주세요'
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '메일주소를 적어주세요'


def test_message_field_blank(fx_flask_client):
    """메시지(message) 필드가 비었는지를 검사합니다."""
    data = dict(name='홍길동', email='test@snoin.com')
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '본문을 적어주세요'


def test_smtp_server_fault(monkeypatch, fx_flask_client):
    """SMTP 서버가 오류를 출력하는 경우를 테스트 합니다."""
    class Fake:
        def ehlo(self):
            raise smtplib.SMTPException('인증실패')

    @contextlib.contextmanager
    def fake_context(*args):
        yield Fake()

    monkeypatch.setattr('smtplib.SMTP_SSL', fake_context)
    data = dict(
        name='홍길동',
        email='test@snoin.com',
        message='상담받고 싶습니다. 연락 주세요.'
    )
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 400
    assert response['message'] == '인증실패'


def test_success(monkeypatch, fx_flask_app, fx_flask_client):
    """전송에 성공하는 경우를 테스트 합니다."""
    context = {}

    class Fake:
        def ehlo(self):
            context['did_ehlo'] = True

        def login(self, id, pw):
            context['did_login'] = True
            context['id'] = id
            context['pw'] = pw

        def send_message(self, msg):
            context['did_send_message'] = True
            context['msg'] = msg

    @contextlib.contextmanager
    def fake_context(*args):
        context['did_enter'] = True
        yield Fake()
        context['did_exit'] = True

    monkeypatch.setattr('smtplib.SMTP_SSL', fake_context)
    data = dict(
        name='홍길동',
        email='test@snoin.com',
        message='상담받고 싶습니다. 연락 주세요.'
    )
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 200
    assert response['message'] == '접수되었습니다.'

    assert context['did_enter']
    assert context['did_ehlo']
    assert context['did_login']
    assert context['id'] == fx_flask_app.config['SMTP_ID']
    assert context['pw'] == fx_flask_app.config['SMTP_PASSWORD']

    msg = context['msg']

    assert msg['Subject'] == '고객님의 신규 상담이 접수되었습니다.'
    assert msg['From'].addresses[0].display_name == 'Snoin'
    assert msg['From'].addresses[0].addr_spec == '"no-reply@snoin.com"'

    assert msg['To'].addresses[0].display_name == \
        fx_flask_app.config['MAIL_LISTENERS'][0].display_name
    assert msg['To'].addresses[0].addr_spec == \
        fx_flask_app.config['MAIL_LISTENERS'][0].addr_spec

    assert msg['To'].addresses[1].display_name == '홍길동'
    assert msg['To'].addresses[1].addr_spec == '"test@snoin.com"'

    mail_body = msg.get_payload()[1].get_content()
    assert '<p>성함: 홍길동</p>' in mail_body
    assert '<p>메일: test@snoin.com</p>' in mail_body
    assert '<p>전화: 없음</p>' in mail_body
    assert '<p>상담받고 싶습니다. 연락 주세요.</p>' in mail_body

    assert context['did_send_message']
    assert context['did_exit']


def test_success_with_phone(monkeypatch, fx_flask_app, fx_flask_client):
    """전화번호(phone)필드에 값을 넣고 난 후에 전송에 성공하는 경우를 테스트 합니다."""
    context = {}

    class Fake:
        def ehlo(self):
            context['did_ehlo'] = True

        def login(self, id, pw):
            context['did_login'] = True
            context['id'] = id
            context['pw'] = pw

        def send_message(self, msg):
            context['did_send_message'] = True
            context['msg'] = msg

    @contextlib.contextmanager
    def fake_context(*args):
        context['did_enter'] = True
        yield Fake()
        context['did_exit'] = True

    monkeypatch.setattr('smtplib.SMTP_SSL', fake_context)
    data = dict(
        name='홍길동',
        email='test@snoin.com',
        message='상담받고 싶습니다. 연락 주세요.',
        phone='82) 10-0000-1234',
    )
    rv = fx_flask_client.post(get_url('contact'), data=data)
    response = json.loads(rv.data.decode())
    assert rv.status_code == 200
    assert response['message'] == '접수되었습니다.'

    assert context['did_enter']
    assert context['did_ehlo']
    assert context['did_login']
    assert context['id'] == fx_flask_app.config['SMTP_ID']
    assert context['pw'] == fx_flask_app.config['SMTP_PASSWORD']

    msg = context['msg']

    assert msg['Subject'] == '고객님의 신규 상담이 접수되었습니다.'
    assert msg['From'].addresses[0].display_name == 'Snoin'
    assert msg['From'].addresses[0].addr_spec == '"no-reply@snoin.com"'

    assert msg['To'].addresses[0].display_name == \
        fx_flask_app.config['MAIL_LISTENERS'][0].display_name
    assert msg['To'].addresses[0].addr_spec == \
        fx_flask_app.config['MAIL_LISTENERS'][0].addr_spec

    assert msg['To'].addresses[1].display_name == '홍길동'
    assert msg['To'].addresses[1].addr_spec == '"test@snoin.com"'

    mail_body = msg.get_payload()[1].get_content()
    assert '<p>성함: 홍길동</p>' in mail_body
    assert '<p>메일: test@snoin.com</p>' in mail_body
    assert '<p>전화: 82) 10-0000-1234</p>' in mail_body
    assert '<p>상담받고 싶습니다. 연락 주세요.</p>' in mail_body

    assert context['did_send_message']
    assert context['did_exit']
