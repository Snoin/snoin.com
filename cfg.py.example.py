# -*- coding: utf-8 -*-
import email.headerregistry

SNOIN_CONFIG = True

SMTP_ID = 'GMAIL ID'
SMTP_PASSWORD = 'SUPER SECRET'
MAIL_LISTENERS = [
    email.headerregistry.Address('이름', 'no-reply@snoin.com'),
]
