from setuptools import find_packages, setup

install_requires = {
    # Web
    'Flask >= 0.11.1',
    # CLI
    'Click >= 6.6',
    # API
    'requests >= 2.12.4',
}

tests_require = {
    'pytest >= 3.0.5',
    'flake8 >= 3.2.1',
    'import-order >= 0.0.11',
}

extras_require = {
    "deploy": [
        # Deploy
        'uwsgi >= 2.0.14',
    ],
    'tests': tests_require,
}

setup(
    name='snoin.com',
    version='0.0.0',
    description='snoin.com website',
    url='https://snoin.com',
    packages=find_packages(),
    install_requires=install_requires,
    tests_require=tests_require,
    extras_require=extras_require,
    entry_points={
        'console_scripts': [
            'snoin-web=snoin.cli:main',
            # TODO: place powebscr later
        ],
    }
)
