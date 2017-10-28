import { AsyncStorage } from 'react-native';
import { isObject, stringify } from './helpers';

export const set = (key, val) => {
  if (isObject(key)) {
    const obj = key;
    const pairs = Object.keys(obj).map(key => [key, stringify(obj[key])]);

    return AsyncStorage.multiSet(pairs);
  }

  return AsyncStorage.setItem(key, stringify(val));
};

export const get = key => AsyncStorage.getItem(key);

export const getAll = () => AsyncStorage.getAllKeys()
  .then(keys => AsyncStorage.multiGet(keys))
  .then(pairs => {
    const cookies = {};
    pairs.forEach(([key, val]) => {
      cookies[key] = val;
    });
    return cookies;
  });

export const remove = key => AsyncStorage.removeItem(key);

export const clearAll = () => AsyncStorage.clear();

// Used only for tests, it's private, don't use it
export const _mock = obj => {
  const pairs = Object.keys(obj).map(key => [key, stringify(obj[key])]);
  return AsyncStorage.multiSet(pairs);
};

export const _platform = 'react native';
