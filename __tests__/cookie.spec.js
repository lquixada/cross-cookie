const cookieBrowser = require('../src/browser');
const cookieNative = require('../src/react-native');

// Both implementations must behave the same way.
[cookieBrowser, cookieNative].forEach(cookie => {

  describe('cookie', () => {
    beforeEach(() => cookie.clearAll());

    beforeEach(() => cookie._mock({
      someKey1: 'someValue1',
      someKey2: 'someValue2',
      someString: 'someValue',
      someBoolean: false,
      someNumber: 1234
    }));

    it('should be available', () => {
      expect(typeof cookie).toBe('object');
    });

    describe('get', () => {
      it('should be null when key does not exist', () => {
        return cookie.get('someInexistentKey').then(val => {
          expect(val).toBeUndefined();
        });
      });

      it('should return value when key exists', () => {
        return cookie.get('someKey1').then(val => {
          expect(val).toBe('someValue1');
        });
      });
    });

    describe('getAll', () => {
      it('should be null when key does not exist', () => {
        return cookie.getAll().then(cookies => {
          expect(cookies.someKey1).toBe('someValue1');
          expect(cookies.someKey2).toBe('someValue2');
        });
      });
    });

    describe('set', () => {
      it('should store a value in a key', () => {
        return cookie.set('someKey', 'someValue')
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(typeof val).toBe('string');
            expect(val).toBe('someValue');
          });
      });

      it('should store boolean as string', () => {
        return cookie.set('someKey', false)
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(typeof val).toBe('string');
            expect(val).toBe('false');
          });
      });

      it('should store number as string', () => {
        return cookie.set('someKey', 1234)
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(typeof val).toBe('string');
            expect(val).toBe('1234');
          });
      });

      it('should store array as string', () => {
        return cookie.set('someKey', [1234])
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(typeof val).toBe('string');
            expect(val).toBe('[1234]');
          });
      });

      it('should store object as string', () => {
        return cookie.set('someKey', {foo: 'bar'})
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(typeof val).toBe('string');
            expect(val).toBe('{"foo":"bar"}');
          });
      });

      it('should store multiple values at once', () => {
        return cookie.getAll()
          .then(cookies => {
            expect(cookies.someString).toBe('someValue');
            expect(cookies.someBoolean).toBe('false');
            expect(cookies.someNumber).toBe('1234');
          });
      });
    });

    describe('remove', () => {
      it('should remove a key from storage', () => {
        return cookie.set('someKey', 'someValue')
          .then(() => cookie.remove('someKey'))
          .then(() => cookie.get('someKey'))
          .then(val => {
            expect(val).toBe(undefined);
          })
          .then(() => cookie.getAll())
          .then(cookies => {
            expect(cookies.someKey).toBeUndefined();
          });
      });
    });

    describe('clearAll', () => {
      it('should remove all keys from storage', () => {
        return cookie.getAll()
          .then(cookies => {
            expect(Object.keys(cookies).length).toBe(5);
          })
          .then(() => cookie.clearAll())
          .then(() => cookie.getAll())
          .then(cookies => {
            expect(Object.keys(cookies).length).toBe(0);
          });
      });
    });
  });

});
