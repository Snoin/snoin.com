from setuptools import find_packages, setup

install_requires = {
    # Web
    'Flask >= 0.12.1',
    # CLI
    'Click >= 6.7',
    # API
    'requests >= 2.14.2',
    # Config
    'toml >= 0.9.2',
}

tests_require = {
    'pytest >= 3.0.5',
    'flake8 >= 3.2.1',
    'flake8-import-order >= 0.12',
    'gixy >= 0.1.4',
}

extras_require = {
    "deploy": [
        # Deploy
        'uwsgi >= 2.0.15',
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
