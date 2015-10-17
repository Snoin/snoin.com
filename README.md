snoin.com
=========

스노인 공식 사이트입니다!

설치
---

1. 본 저장소를 clone하세요

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

4. bower package를 설치합니다 `bower`가 이미 설치되어 있어야 합니다.

    ```
    $ bower install
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

개발 서버
-------

다음 명령어를 실행해보세요.

```
$ snoin-web runserver
```
