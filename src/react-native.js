import { AsyncStorage } from 'react-native';
import { isObject, stringify } from './helpers';

const set = (key, val) => {
  if (isObject(key)) {
    const obj = key;
    const pairs = Object.keys(obj).map(key => [key, stringify(obj[key])]);

    return AsyncStorage.multiSet(pairs);
  }

  return AsyncStorage.setItem(key, stringify(val));
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

// Used only for tests, it's private, don't use it
const _mock = obj => {
  const pairs = Object.keys(obj).map(key => [key, stringify(obj[key])]);
  return AsyncStorage.multiSet(pairs);
};

const _platform = 'react native';

export default { set, get, getAll, remove, clearAll, _mock, _platform };
