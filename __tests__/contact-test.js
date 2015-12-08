// __tests__/contact-test.js
jest
  .dontMock('../snoin/web/static/src/contact')
  .dontMock('es6-promise');

describe('contact', function() {
  it('empty name throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    var name = '';
    var email = 'no-reply@snoin.com';
    var phone = '010-0000-0000';
    var message = '연락주세요';
    function onSuccess(data) {}
    function onFail(error) {}

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact(name, email, phone, message, onSuccess, onFail);
  });

  it('empty email throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    var name = '홍길동';
    var email = '';
    var phone = '010-0000-0000';
    var message = '연락주세요';
    function onSuccess(data) {}
    function onFail(error) {}

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact(name, email, phone, message, onSuccess, onFail);
  });

  it('empty message throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    var name = '홍길동';
    var email = 'no-reply@snoin.com';
    var phone = '010-0000-0000';
    var message = '';
    function onSuccess(data) {}
    function onFail(error) {}

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.reject(new Error('이름을 적어주세요!'));
    });

    contact(name, email, phone, message, onSuccess, onFail);
  });

  it('empty phone do not throw error', function() {
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
      return Promise.resolve();
    });

    contact(name, email, phone, message, onSuccess, onFail);
  });

  it('full fields do not throw error', function() {
    require('es6-promise').polyfill();
    var fetch = require('isomorphic-fetch');
    var contact = require('../snoin/web/static/src/contact');

    var name = '홍길동';
    var email = 'no-reply@snoin.com';
    var phone = '010-0000-0000';
    var message = '연락주세요';
    function onSuccess(data) {}
    function onFail(error) {}

    fetch.mockImplementation(function(url, options) {
      expect(url).toBe('/contact/');
      expect(options.method).toBe('post');
      expect(options.body).toBeTruthy();
      return Promise.resolve();
    });

    contact(name, email, phone, message, onSuccess, onFail);
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
