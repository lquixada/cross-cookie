const format = (key, val) => {
  val = typeof val === 'string'? val: JSON.stringify(val);
  return `${key}=${val}`;
};

const isObject = (val) => val !== null && typeof val === 'object' && val instanceof Object;

module.exports = {
  format,
  isObject
};
