import email.headerregistry

SMTP_ID = 'GMAIL ID'
SMTP_PASSWORD = 'SUPER SECRET'
MAIL_LISTENERS = [
    email.headerregistry.Address('name', 'no-reply@snoin.com'),
]
