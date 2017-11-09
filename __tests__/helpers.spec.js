const { stringify, isPlainObject } = require('../src/helpers');

describe('helpers', () => {
  describe('stringify', () => {
    it('should stringify a string value', () => {
      expect(stringify('value')).toBe('value');
    });

    it('should stringify a boolean value', () => {
      expect(stringify(true)).toBe('true');
    });

    it('should stringify a number value', () => {
      expect(stringify(123)).toBe('123');
    });

    it('should stringify a array value', () => {
      expect(stringify([123])).toBe('[123]');
    });

    it('should stringify a object value', () => {
      expect(stringify({foo: 'bar'})).toBe('{"foo":"bar"}');
    });
  });

  describe('isPlainObject', () => {
    it('should be false on null', () => {
      expect(isPlainObject(null)).toBe(false);
    });

    it('should be true on object literal', () => {
      expect(isPlainObject({})).toBe(true);
    });
  });
});
