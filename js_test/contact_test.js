import { jsonOk, jsonError, textError } from './util.js';
import contact from '../snoin/web/static/src/contact';
import 'isomorphic-fetch';

describe('contact', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('with empty name arguments', () => {
    it('must be occur error', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (message also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email and phone also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (email and message also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone and message also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (the rest fields also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'', /* empty! */
        /* email */'',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('이름을 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('with empty email arguments', () => {
    it('must be occur error', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'연락 바랍니다',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (message also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (the rest fields also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'', /* empty! */
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('메일 주소를 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('with empty message arguments', () => {
    it('must be occur error', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('문의 사항을 적어주세요!')).toBe(true);
      done();
    });

    it('must be occur error (phone also empty)', (done) => {
      let success = sinon.spy();
      let fail = sinon.spy();

      let args = [
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'', /* empty! */
        /* message */'', /* empty! */
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);

      expect(fail.calledOnce).toBe(true);
      expect(fail.calledWith('문의 사항을 적어주세요!')).toBe(true);
      done();
    });
  });

  describe('normal requests', () => {
    beforeEach(() => {
      window.fetch.returns(jsonOk({'message': '접수되었습니다.'}));
    });

    it('must not be occur error', (done) => {
      let fail = sinon.spy();
      let success = (data) => {
        expect(fail.calledOnce).toBe(false);
        expect(data.message).toEqual('접수되었습니다.');
        done();
      };

      let args = [
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);
    });
  });

  describe('respond 500', () => {
    beforeEach(() => {
      window.fetch.returns(jsonError(500, {'message': 'Some error Message.'}));
    });

    it('must be occur error', (done) => {
      let success = sinon.spy();
      let fail = (data) => {
        expect(success.calledOnce).toBe(false);
        expect(data.message).toEqual('Some error Message.');
        done();
      };

      let args = [
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);
    });
  });

  describe('respond 500 with non-json', () => {
    beforeEach(() => {
      window.fetch.returns(jsonError(500, 'It is not JSON'));
    });

    it('must be occur error', (done) => {
      let success = sinon.spy();
      let fail = (data) => {
        expect(success.calledOnce).toBe(false);
        done();
      };

      let args = [
        /* name */'홍길동',
        /* email */'test@example.com',
        /* phone */'010-0000-0000',
        /* message */'연락 바랍니다.',
        /* onSuccess */success,
        /* onFail */fail
      ];

      contact(...args);
    });
  });
});
