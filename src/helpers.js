
const PREFIX = '@cookie:';

export const addPrefix = (key) => `${PREFIX}${key}`;

export const removePrefix = (key = '') => key.replace(PREFIX, '');

export const hasPrefix = (key = '') => (new RegExp(`^${PREFIX}`)).test(key);

export const stringify = val => typeof val === 'string'? val: JSON.stringify(val);

export const stringifyOptions = opts =>
  Object.keys(opts)
    .filter(key => /^(?:expires|path|domain|secure)$/i.test(key))
    .reduce((memo, key) => `${memo}; ${key}=${opts[key]}`, '');

export const isPlainObject = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};
