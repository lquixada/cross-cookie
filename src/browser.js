import { stringify, stringifyOptions, isPlainObject } from './helpers';

/* setters */
const set = (key, val, opts = {}) => {
  const cookies = isPlainObject(key)? key : {[key]: val};
  opts = stringifyOptions(opts);

  Object.keys(cookies)
    .forEach(key => {
      document.cookie = `${key}=${stringify(cookies[key])}; ${opts}`;
    });

  return Promise.resolve();
};

/* getters */
const get = key => {
  const match = document.cookie.match(new RegExp(`(${key})=(.*?)(;|$)`));

  return Promise.resolve(match ? match[2] : undefined);
};

const getAll = () => {
  const cookies = {};

  document.cookie
    .replace(/; /g, ';')
    .split(';')
    .map(cookie => cookie.split('='))
    // Filters only those who has a non-empty key (happens when you delete one)
    .filter(([key, ]) => key)
    .forEach(([key, val]) => cookies[key] = val);

  return Promise.resolve(cookies);
};

/* removers */
const remove = key => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  return Promise.resolve();
};

const clearAll = () => {
  document.cookie
    .replace(/; /g, ';')
    .split(';')
    .map(cookie => cookie.split('=')[0])
    .forEach(remove);

  return Promise.resolve();
};

/* Used only for tests, it's private, don't use it */
const _mock = cookies => {
  Object.keys(cookies)
    .forEach(key => {
      document.cookie = `${key}=${stringify(cookies[key])}`;
    });

  return Promise.resolve();
};

const _platform = 'browser';

export default { set, get, getAll, remove, clearAll, _mock, _platform };
