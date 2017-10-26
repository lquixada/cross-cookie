const { AsyncStorage } = require('react-native');
const { isObject } = require('./helper');

const set = (key, val) => {
  if (isObject(key)) {
    const obj = key;
    const pairs = Object.keys(obj).map(key => [key, JSON.stringify(obj[key])]);

    return AsyncStorage.multiSet(pairs);
  }

  return AsyncStorage.setItem(key, JSON.stringify(val));
};

const get = key => AsyncStorage.getItem(key);

const getAll = () => AsyncStorage.getAllKeys()
  .then(keys => AsyncStorage.multiGet(keys))
  .then(pairs => {
    const cookies = {};
    pairs.forEach(([key, val]) => {
      cookies[key] = val;
    });
    return cookies;
  });

const remove = key => AsyncStorage.removeItem(key);

const clearAll = () => AsyncStorage.clear();

module.exports = {
  set,
  get,
  getAll,
  remove,
  clearAll,
};
