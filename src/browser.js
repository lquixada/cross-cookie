import { stringify, isObject } from './helpers';

const set = (key, val) =>
  new Promise(resolve => {
    const obj = isObject(key)? key : {[key]: val};

    Object.keys(obj)
      .forEach(key => {
        document.cookie = `${encodeURIComponent(key)}=${stringify(obj[key])}`;
      });

    resolve();
  });

const get = key =>
  new Promise(resolve => {
    key = encodeURIComponent(key);
    const match = document.cookie.match(new RegExp(`(${key})=(.*?)(;|$)`));
    resolve(match ? match[2] : undefined);
  });

const getAll = () =>
  new Promise(resolve => {
    const cookies = {};
    document.cookie
      .replace(/; /g, ';')
      .split(';')
      .map(cookie => cookie.split('='))
      // Filters only those who has a non-empty key (happens when you delete one)
      .filter(([key, ]) => key)
      .forEach(([key, val]) => cookies[encodeURIComponent(key)] = val);
    resolve(cookies);
  });

const remove = key =>
  new Promise(resolve => {
    key = encodeURIComponent(key);
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    resolve();
  });

const clearAll = () =>
  new Promise(resolve => {
    document.cookie
      .replace(/; /g, ';')
      .split(';')
      .map(cookie => cookie.split('=')[0])
      .forEach(key => {
        remove(key);
      });
    resolve();
  });

// Used only for tests, it's private, don't use it
const _mock = obj => {
  Object.keys(obj).forEach(key => {
    document.cookie = `${key}=${stringify(obj[key])}`;
  });
  return Promise.resolve();
};

const _platform = 'browser';

export default { set, get, getAll, remove, clearAll, _mock, _platform };
