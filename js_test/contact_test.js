/* global sinon */
import 'babel-polyfill';
import 'whatwg-fetch';
import { jsonOk, jsonError, textError } from './util';
import contact from '../snoin/web/static/src/contact';

describe('contact', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('with empty name arguments', () => {
    it('must be occur error', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (message also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email and phone also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email and message also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone and message also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (the rest fields also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'', /* empty! */
        /* email */'',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('with empty email arguments', () => {
    it('must be occur error', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (message also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (the rest fields also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('with empty message arguments', () => {
    it('must be occur error', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('문의 사항을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      const success = sinon.spy();
      const fail = sinon.spy();

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('문의 사항을 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('normal requests', () => {
    beforeEach(() => {
      const response = {
        message: '접수되었습니다.',
      };
      window.fetch.returns(jsonOk(response));
    });

    it('must not be occur error', (done) => {
      const fail = sinon.spy();
      const success = (data) => {
        expect(fail.calledOnce).toBe(false);
        expect(data.message).toEqual('접수되었습니다.');
        done();
      };

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
      ];

      contact(...args);
    });
  });

  describe('respond 500', () => {
    beforeEach(() => {
      const response = {
        message: 'Some error Message.',
      };
      window.fetch.returns(jsonError(500, response));
    });

    it('must be occur error', (done) => {
      const success = sinon.spy();
      const fail = (error) => {
        expect(success.calledOnce).toBe(false);
        expect(error.message).toEqual('Some error Message.');
        done();
      };

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
      ];

      contact(...args);
    });
  });

  describe('respond 500 with non-json', () => {
    beforeEach(() => {
      window.fetch.returns(textError(500, 'It is not JSON'));
    });

    it('must be occur error', (done) => {
      const success = sinon.spy();
      const fail = () => {
        expect(success.calledOnce).toBe(false);
        done();
      };

      const args = [
        /* onSuccess */success,
        /* onFail */fail,
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
      ];

      contact(...args);
    });
  });
});
