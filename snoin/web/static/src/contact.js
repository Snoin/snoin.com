require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
var FormData = require('form-data');

function contact(name, email, phone, message, onSuccess, onFail) {
  if (typeof onSuccess !== 'function') {
    onSuccess = console.log;
  }
  if (typeof onFail !== 'function') {
    onFail = console.log;
  }

  if (!name) {
    return onFail('이름을 적어주세요!');
  }
  if (!email) {
    return onFail('메일 주소를 적어주세요!');
  }
  if (!message) {
    return onFail('문의 사항을 적어주세요!');
  }
  if (!phone) {
    phone = '';
  }

  var data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('phone', phone);
  data.append('message', message);

  window.fetch('/contact/', {
    method: 'post',
    body: data
  }).then(function (data) {
    if (data.status == 200) {
      return data.json();
    } else {
      return data.json()
        .then(function (data) {
          return Promise.reject(data);
        }).catch(function (error) {
          return Promise.reject(new Error(data.statusText));
        });
    }
  }).then(function (data){
    onSuccess(data);
  }).catch(function (error) {
    onFail(error);
  });
}

module.exports = contact;
