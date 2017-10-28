
const stringify = val => typeof val === 'string'? val: JSON.stringify(val);

const format = (key, val) => {
  return `${key}=${stringify(val)}`;
};

const isObject = (val) => val !== null && typeof val === 'object' && val instanceof Object;

module.exports = {
  format,
  isObject,
  stringify
};
