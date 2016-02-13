import 'babel-polyfill';
import 'isomorphic-fetch';
import FormData from 'form-data';

function contact(onSuccess, onFail, name = '', email = '', phone = '', message = '') {
  const success = typeof onSuccess === 'function' ? onSuccess : console.log;
  const fail = typeof onFail === 'function' ? onFail : console.log;

  if (!name) {
    return fail('이름을 적어주세요!');
  }
  if (!email) {
    return fail('메일 주소를 적어주세요!');
  }
  if (!message) {
    return fail('문의 사항을 적어주세요!');
  }

  const data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('phone', phone);
  data.append('message', message);

  window.fetch('/contact/', {
    method: 'post',
    body: data,
  }).then(response => {
    const json = response.json()
      .catch(error => {
        fail(error);
      });
    if (response.status >= 200 && response.status < 300) {
      return json.then(res => {
        success(res);
      });
    }
    return json.then(res => {
      fail(res);
    });
  }).catch(error => {
    fail(error);
  });
  return true;
}

export default contact;
