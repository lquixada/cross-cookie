const cookie = require('../src/browser');

describe('cookie', () => {
  it('should be available', () => {
    expect(typeof cookie).toBe('object');
  });

  describe('get', () => {
    it('should be null when key does not exist', () => {
      return cookie.get('someInexistentKey').then(val => {
        expect(val).toBe(null);
      });
    });

    it('should return value when key exists', () => {
      document.cookie = 'someKey=someValue';

      return cookie.get('someKey').then(val => {
        expect(val).toBe('someValue');
      });
    });

    it('should return the right value when multiple key exist', () => {
      document.cookie = 'someKey1=someValue1';
      document.cookie = 'someKey2=someValue2';

      return cookie.get('someKey1').then(val => {
        expect(val).toBe('someValue1');
      });
    });
  });

  describe('getAll', () => {
    beforeEach(() => cookie.clearAll());

    it('should be null when key does not exist', () => {
      document.cookie = 'someKey1=someValue1';
      document.cookie = 'someKey2=someValue2';

      return cookie.getAll().then(cookies => {
        expect(cookies.someKey1).toBe('someValue1');
        expect(cookies.someKey2).toBe('someValue2');
      });
    });
  });

  describe('clearAll', () => {
    it('should remove all keys from storage', () => {
      document.cookie = 'someKey1=someValue1';
      document.cookie = 'someKey2=someValue2';

      return cookie.clearAll().then(cookies => {
        expect(Object.keys(cookies)).toEqual([]);
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

    it('should store multiple values at once', () => {
      return cookie.set({
          someString: 'someValue',
          someBoolean: false,
          someNumber: 1234
        })
        .then(() => cookie.getAll())
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
          expect(val).toBe(null);
        });
    });
  });
});
