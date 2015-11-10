snoin.com
=========

스노인 공식 사이트입니다!

설치
---

1. 본 저장소를 clone 하세요.

    ```
    $ git clone https://github.com/Snoin/snoin.com.git
    $ cd snoin.com
    ```

2. Python package를 설치합니다. Python 3.4 이상과 `pip`이 이미 설치되어 있어야 합니다.

    ```
    $ pip install -e .
    ```

3. npm package를 설치합니다. node.js와 `npm`이 이미 설치되어 있어야 합니다.

    ```
    $ npm install
    ```

빌드
---

```
$ npm run build
```

만약 개발중이라면 watch를 사용해보세요.

```
$ npm run watch
```

설정 파일
-------

환경 설정 파일은 `.py` 확장자로 구성되어야 합니다.
파일의 내용은 `cfg.py.example.py` 파일을 참고해주세요.

개발 서버
-------

다음 명령어를 실행해보세요.

```
$ snoin-web runserver -c 설정파일
```

서버 테스트
---------

서버 테스트는 py.test를 사용합니다.
개발환경용 설치가 추가로 필요합니다.

```
$ pip install -e .[tests]
```

테스트 파일은 `tests`에 있으므로 다음과 같이 명령을 실행하면 됩니다.

```
$ py.test tests
```
