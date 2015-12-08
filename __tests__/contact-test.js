// __tests__/contact-test.js
jest
  .dontMock('../snoin/web/static/src/contact')
  .dontMock('es6-promise');

describe('contact', function() {
  it('empty name throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    function onSuccess(data) {}
    function onFail(error) {}
    var args = [/*name*/'', /*email*/'no-reply@snoin.com', /*phone*/'010-0000-0000', /*message*/'연락주세요', /*onSuccess*/onSuccess, /*onFail*/onFail];

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact.apply(this, args);
  });

  it('empty email throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    function onSuccess(data) {}
    function onFail(error) {}
    var args = [/*name*/'홍길동', /*email*/'', /*phone*/'010-0000-0000', /*message*/'연락주세요', /*onSuccess*/onSuccess, /*onFail*/onFail];

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact.apply(this, args);
  });

  it('empty message throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    function onSuccess(data) {}
    function onFail(error) {}
    var args = [/*name*/'홍길동', /*email*/'no-reply@snoin.com', /*phone*/'010-0000-0000', /*message*/'', /*onSuccess*/onSuccess, /*onFail*/onFail];

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact.apply(this, args);
  });

  it('empty phone do not throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    function onSuccess(data) {}
    function onFail(error) {}
    var args = [/*name*/'홍길동', /*email*/'no-reply@snoin.com', /*phone*/'', /*message*/'연락주세요', /*onSuccess*/onSuccess, /*onFail*/onFail];

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.resolve();
    });

    contact.apply(this, args);
  });

  it('full fields do not throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    function onSuccess(data) {}
    function onFail(error) {}
    var args = [/*name*/'홍길동', /*email*/'no-reply@snoin.com', /*phone*/'010-0000-0000', /*message*/'연락주세요', /*onSuccess*/onSuccess, /*onFail*/onFail];

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.resolve();
    });

    contact.apply(this, args);
  });

  it('server error throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    var name = '홍길동';
    var email = 'no-reply@snoin.com';
    var phone = '';
    var message = '연락주세요';
    function onSuccess(data) {}
    function onFail(error) {}

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('에러'));
    });

    contact(name, email, phone, message, onSuccess, onFail);
  });
});
