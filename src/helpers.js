
const stringify = val => typeof val === 'string'? val: JSON.stringify(val);

const isObject = (val) => val !== null && typeof val === 'object' && val instanceof Object;

module.exports = {
  isObject,
  stringify
};
