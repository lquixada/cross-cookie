import { AsyncStorage } from 'react-native';
import { isPlainObject, addPrefix, hasPrefix, removePrefix, stringify } from './helpers';

/* setters */
const set = (key, val) => {
  const obj = isPlainObject(key)? key : {[key]: val};
  const pairs = Object.keys(obj).map(key => [addPrefix(key), stringify(obj[key])]);

  return AsyncStorage.multiSet(pairs);
};

/* getters */
const get = key => AsyncStorage.getItem(addPrefix(key));

const getAll = () => AsyncStorage.getAllKeys()
  .then(keys => keys.filter(hasPrefix))
  .then(keys => AsyncStorage.multiGet(keys))
  .then(pairs => {
    const cookies = {};
    pairs.forEach(([key, val]) => {
      cookies[removePrefix(key)] = val;
    });
    return cookies;
  });

/* removers */
const remove = key => AsyncStorage.removeItem(addPrefix(key));

const clearAll = () => AsyncStorage.clear();

/* Used only for tests, it's private, don't use it */
const _mock = obj => {
  const pairs = Object.keys(obj).map(key => [addPrefix(key), stringify(obj[key])]);
  return AsyncStorage.multiSet(pairs);
};

const _platform = 'react native';

export default { set, get, getAll, remove, clearAll, _mock, _platform };
