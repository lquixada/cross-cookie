const { stringify, isObject } = require('../src/helpers');

describe('helpers', () => {
  describe('stringify', () => {
    it('should format a key-value pair with string value', () => {
      expect(stringify('value')).toBe('value');
    });

    it('should format a key-value pair with boolean value', () => {
      expect(stringify(true)).toBe('true');
    });

    it('should format a key-value pair with number value', () => {
      expect(stringify(123)).toBe('123');
    });

    it('should format a key-value pair with array value', () => {
      expect(stringify([123])).toBe('[123]');
    });

    it('should format a key-value pair with object value', () => {
      expect(stringify({foo: 'bar'})).toBe('{"foo":"bar"}');
    });
  });

  describe('isObject', () => {
    it('should be false on null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should be true on object literal', () => {
      expect(isObject({})).toBe(true);
    });
  });
});
