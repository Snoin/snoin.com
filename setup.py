from setuptools import find_packages, setup

install_requires = {
    # Web
    'Flask >= 0.10.1',
    # CLI
    'Click >= 5.1',
    # API
    'requests >= 2.8.1',
}

tests_require = {
    'pytest >= 2.8.2',
    'flake8 >= 2.5.0',
    'import-order >= 0.0.6',
}

extras_require = {
    "deploy": [
        # Deploy
        'uwsgi >= 2.0.11.2',
    ],
    'tests': tests_require,
}

setup(
    name='snoin.com',
    version='0.0.0',
    description='snoin.com website',
    url='http://snoin.com',
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
