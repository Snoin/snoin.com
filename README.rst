snoin.com
=========

.. image:: https://travis-ci.org/Snoin/snoin.com.svg?branch=master
   :target: https://travis-ci.org/Snoin/snoin.com
   :alt: Build Status of Snoin/snoin.com

스노인 공식 사이트입니다!


Installation
------------

1. 본 저장소를 clone 하세요.

   .. code-block:: console

      $ git clone https://github.com/Snoin/snoin.com.git
      $ cd snoin.com

2. Python package를 설치합니다. Python 3.4 이상과 ``pip``\이 이미 설치되어 있어야 합니다.

   .. code-block:: console

      $ pip install -e .

3. npm package를 설치합니다. Node.js 5.0 이상과 ``npm``\이 이미 설치되어 있어야 합니다.

   .. code-block:: console

      $ npm install

Build Static Files
------------------

다음 명령어를 사용하여 빌드하실 수 있습니다.

.. code-block:: console

   $ npm run build

.. tip::

   만약 개발중이라면 watch를 사용해보세요.

   .. code-block:: console

      $ npm run watch

Configuration File
------------------

환경 설정 파일은 ``.py`` 확장자로 구성되어야 합니다.
파일의 내용은 ``cfg.py.example.py`` 파일을 참고해주세요.


Test Server for Developing
--------------------------

다음 명령어를 실행해보세요.

.. code-block:: console

   $ snoin-web runserver -c 설정파일


Testing Python Files
--------------------

Python 파일의 테스트는 pytest를 사용합니다.
개발환경용 설치가 추가로 필요합니다.

.. code-block:: console

   $ pip install -e .[tests]

테스트 파일은 ``tests``\에 있으므로 다음과 같이 명령을 실행하면 됩니다.

.. code-block:: console

   $ py.test tests

.. warning::

   만약 ``py.test`` 명령어를 ``tests`` 인자 없이 사용하면 ``node_modules`` 내의
   의존성들까지 모두 포함되므로 주의를 요합니다.

License
-------

AGPLv3
