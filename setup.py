from setuptools import find_packages, setup

install_requires = {
    # Web
    'Flask >= 0.10.1',
    # CLI
    'Click >= 5.1',
    # API
    'requests >= 2.8.1',
}

setup(
    name='snoin.com',
    version='0.0.0',
    description='snoin.com website',
    url='http://snoin.com',
    packages=find_packages(),
    install_requires=install_requires,
    entry_points={
        'console_scripts': [
            'snoin-web=snoin.cli:main',
        ],
    }
)
