const { format, isObject } = require('../src/helpers');

describe('helpers', () => {
  describe('format', () => {
    it('should format a key-value pair with string value', () => {
      expect(format('key', 'value')).toBe('key=value');
    });

    it('should format a key-value pair with boolean value', () => {
      expect(format('key', true)).toBe('key=true');
    });

    it('should format a key-value pair with number value', () => {
      expect(format('key', 123)).toBe('key=123');
    });

    it('should format a key-value pair with array value', () => {
      expect(format('key', [123])).toBe('key=[123]');
    });

    it('should format a key-value pair with object value', () => {
      expect(format('key', {foo: 'bar'})).toBe('key={"foo":"bar"}');
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
