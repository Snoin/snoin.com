Working Convention of Snoin
===========================

이 문서는 Snoin의 모든 개발에서 적용 될 컨벤션에 대해 다룹니다.


README, CONTRIBUTING GUIDE File
-------------------------------
* `reStructured Text`_\를 사용하여 작성하며, 파일명은 항시 README는
  ``README.rst``, CONTRIBUTING GUIDE는 ``CONTRIBUTING.rst``\로 통일한다.

.. _`reStructured Text`: http://docutils.sourceforge.net/rst.html


All Files
---------
* 모든 text 파일은 1줄의 공백으로 끝낸다.
* 보안상 유출되면 안되는 내용은 코드상에 포함하지 않는다.


Python
------
* Python 버전은 가능한 공식적으로 배포된 stable한 최신 버전을 사용한다.
  따라서 alpha, beta, rc는 사용하지 않는다.
* 모든 Python코드는 PEP-8_ 코딩 컨벤션을 준수한다. 단, 외부에서 가져왔고,
  생산품에 전혀 영향을 주지 않는 코드는 제외한다.
* flake8_\을 사용해서 PEP-8_ 준수 여부를 항시 검사한다.
* indentation으로는 space 4글자를 사용한다.
* 불필요한 diff 발생을 막기 위해 모든 ``import``\는 알파벳 오름차순(a-z순)으로
  정렬한다. 혹시라도 있을 수 있는 실수를 방지하기 위해
  flake8-import-order_\를 사용하여 import 순서를 강제적으로 통일한다.
  (단, flake8-import-order_\를 사용하는 대상은 테스트 대상이 되는 Python 버전 중
  가장 최신 버전만 해당한다)
* 다른 Third-party 라이브러리와의 연동을 위해 docstring 외의 내용이 있는 모든
  모듈은 ``__all__`` 변수를 항상 작성한다.
* Old-style formatting(``'%s'`` 등을 사용하는 것)은 사용하지 않는다. 대신
  ``str.format`` 함수를 사용한다.
* 필요에 따라 문서화를 할 수 있다. 이 경우 문법은 Sphinx 처리를 위해
  `reStructured Text`_\를 사용한다.
* ``setup.py``\를 통해 의존성을 관리하도록 한다. ``requirements.txt``\는 불가피한
  경우가 아니면 사용하지 않는다.
* ``import``\문은 기본적으로 모듈 레벨이 1단계인 것은 ``import``\로, 2단계 이상인
  것은 ``from ~ import ~``\의 형태로 사용한다.

   .. code-block:: python

      # 모두 1단계
      import json
      import subprocess

      import pytest

      #  2단계 → from import
      from urllib.parse import quote

      from sqlalchemy.orm.session import sessionmaker

* 모듈 이름 길이가 짧은 배터리(내장) 모듈에 한해서는 2단계를 넘더라도
  ``import``\를 허용한다.

   .. code-block:: python

      import os.path

* 예외적으로 외부 모듈에 대해서는 가독성을 위한 부분에서는 1단계에서도
  ``from ~ import ~``\를 허용한다. 단, 객체명이 모호해지는 경우엔 불허한다.

   .. code-block:: python

      from flask import Flask, request  # OK
      from yaml import loads # No!!

* 내부 참조는 모두 상대경로로 작성하며, ``from ~ import ~`` 형식으로만 사용한다.

   .. code-block:: python

      from .config import load_config

* 배터리(내장) 모듈, 외부 의존성 모듈, 내부 의존성 모듈간에는 각각 1개의 빈 줄을 둔다.

   .. code-block:: python

      import os

      from flask import Flask, request

      from .config import load_config

* 인자가 추가되어 지속적으로 diff를 발생시킬 소지가 있는 ``list``, ``set``,
  ``dict`` 등은 전개하여 작성하며, 마지막 인자도 ``,``\를 단다.

   .. code-block:: python

      install_requires = {
          'flask > 0.10',
          'click >= 5.1',
      }

.. _PEP-8: https://www.python.org/dev/peps/pep-0008/
.. _flake8: https://flake8.readthedocs.org/en/latest/
.. _flake8-import-order: https://github.com/PyCQA/flake8-import-order/


HTML
----
* 모든 문서는 HTML5로 작성한다. 다만 ``<frame>`` 태그가 필요하다면 해당
  문서만 XHTML1 Frameset으로 작성한다.
* self-closing tag(``<br>``, ``<input>`` 등)을 XML 스타일로 닫는
  것(``<br />``)은 금지한다.
* ``class`` 속성의 작명은 `BEM`_ 규칙을 따른다
* indentation으로는 space 2글자를 사용한다.

.. _BEM: https://css-tricks.com/bem-101/

JavaScript
----------
* `Airbnb JavaScript Style Guide`_를 준수한다.
* `eslint`_를 사용하여 컨벤션 준수 여부를 검사한다.
* jsx를 사용하는 경우, 자식 요소가 없는 태그는 XML 스타일로 닫는다. (``<MyApp />``)
* 개발이 사실상 중지된 bower, grunt는 사용하지 않는다.
* 코드 컴파일시 sourcemap을 만든다.

.. _Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript/
.. _eslint: http://eslint.org/


SCSS (CSS)
----------
* 기본적으로 `stylelint-config-standard`_를 준수한다.
* `stylelint`_를 사용하여 컨벤션 준수 여부를 검사한다.
* 모든 속성은 알파벳 순으로 정렬한다.
* ID selector(``#id``)는 사용하지 않는다.
* 확장자는 ``.scss``\로 통일한다.
* 개발환경에서는 코드 빌드시 sourcemap을 만든다.

.. _stylelint-config-standard: https://github.com/stylelint/stylelint-config-standard/
.. _stylelint: http://stylelint.io/


Git
---
* 계정에 포함된 모든 hook은 설치하여 사용한다.

   .. code-block:: console

      $ mkdir -p .git/hooks/
      $ ln -s $(pwd)/hooks/pre-commit .git/hooks

* 각각의 commit은 가능한 테스트를 통과하도록 구성한다.


GitHub, BitBucket
-----------------
* upstream의 master branch에 직접 push는 금지한다.


Web URI
-------
* 웹 페이지의 route를 설정하는 경우 반드시 끝에 ``/``\를 붙인다.
  (그렇게 하지 않으면 ``/``\를 맨 뒤에 붙인 경우 접속이 안 될 수 있기 때문)

   .. code-block:: python

      @app.route('/hello/world/')
      def helloworld():
          pass


Testing
-------
* Python의 테스팅은 pytest_\를 사용하며, `pytest-cov`_\를 사용하여
  coverage를 측정한다.
* JavaScript의 테스팅은 karma_\를 사용한다.

.. _pytest: http://pytest.org/latest/
.. _pytest-cov: https://pypi.python.org/pypi/pytest-cov
.. _karma: https://karma-runner.github.io/0.13/index.html
