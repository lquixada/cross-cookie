import { stringify, isObject } from './helpers';

const set = (key, val) => {
  const obj = isObject(key)? key : {[key]: val};

  Object.keys(obj)
    .forEach(key => {
      document.cookie = `${encodeURIComponent(key)}=${stringify(obj[key])}`;
    });

  return Promise.resolve();
};

const get = key => {
  key = encodeURIComponent(key);
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
    .forEach(([key, val]) => cookies[encodeURIComponent(key)] = val);

  return Promise.resolve(cookies);
};

const remove = key => {
  key = encodeURIComponent(key);
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

// Used only for tests, it's private, don't use it
const _mock = obj => {
  Object.keys(obj)
    .forEach(key => {
      document.cookie = `${key}=${stringify(obj[key])}`;
    });

  return Promise.resolve();
};

const _platform = 'browser';

export default { set, get, getAll, remove, clearAll, _mock, _platform };
