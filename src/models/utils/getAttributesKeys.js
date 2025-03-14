module.exports.getAttributesKeys = (obj, params) => {
  let keys = Object.keys(obj.rawAttributes);
  if (Array.isArray(params.exclude)) {
    keys = keys.filter((key) => !params.exclude.includes(key));
  }
  return keys;
};
