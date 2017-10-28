const { format, isObject } = require('./helpers');

const set = (key, val) =>
  new Promise(resolve => {
    if (isObject(key)) {
      const obj = key;
      Object.keys(obj).forEach(key => document.cookie = format(key, obj[key]));
    } else {
      document.cookie = format(key, val);
    }

    resolve();
  });

const get = key =>
  new Promise(resolve => {
    const match = document.cookie.match(new RegExp(`(${key})=(.*?)(;|$)`));
    resolve(match ? match[2] : null);
  });

const getAll = () =>
  new Promise(resolve => {
    const cookies = {};
    document.cookie.replace(/; /g, ';')
      .split(';')
      .map(cookie => cookie.split('='))
      .forEach(([key, val]) => cookies[key] = val);
    resolve(cookies);
  });


const remove = key =>
  new Promise(resolve => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    resolve();
  });

const clearAll = () =>
  new Promise(resolve => {
    document.cookie.split(';').map(cookie => cookie.split('=')[0]).forEach(remove);
    resolve();
  });

module.exports = {
  set,
  get,
  getAll,
  remove,
  clearAll,
};
