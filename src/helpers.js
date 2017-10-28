
export const stringify = val => typeof val === 'string'? val: JSON.stringify(val);

export const isObject = (val) => val !== null && typeof val === 'object' && val instanceof Object;
