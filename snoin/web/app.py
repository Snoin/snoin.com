from email.headerregistry import Address
from email.message import EmailMessage
import json
import smtplib

from flask import Flask, jsonify, render_template, request
from requests import get
from werkzeug.contrib.cache import SimpleCache

__all__ = 'app',

app = Flask(__name__, template_folder='templates')
cache = SimpleCache()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/contact/', methods=['POST'])
def contact():
    def error(message):
        response = jsonify(message=message)
        response.status_code = 400
        return response

    name = request.form.get('name', None)
    email_addr = request.form.get('email', None)
    phone = request.form.get('phone', '없음')
    message = request.form.get('message', None)

    if name is None:
        return error('이름을 적어주세요')

    if email_addr is None:
        return error('메일주소를 적어주세요')

    if message is None:
        return error('본문을 적어주세요')

    context = render_template(
        'response.html',
        name=name,
        email_addr=email_addr,
        phone=phone,
        message=message
    )

    msg = EmailMessage()
    msg['Subject'] = "고객님의 신규 상담이 접수되었습니다."
    msg['From'] = Address('Snoin', 'no-reply@snoin.com')
    msg['To'] = app.config['MAIL_LISTENERS'] + [Address(name, email_addr)]

    msg.set_content('접수되었습니다.')
    msg.add_alternative(context, subtype='html')

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as s:
            s.ehlo()
            s.login(app.config['SMTP_ID'], app.config['SMTP_PASSWORD'])
            s.send_message(msg)
    except smtplib.SMTPException as e:
        return error(str(e))

    return jsonify(message='접수되었습니다.')


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
            cache.set(username, url, timeout=1*60*60)
        return url

    return dict(get_gravatar_image=get_gravatar_image)
