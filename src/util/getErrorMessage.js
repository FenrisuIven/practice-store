module.exports = {
  minLength: (attr, len) => `${attr} must contain at least ${len} characters`,
  maxLength: (attr, len) => `${attr} cannot be longer than ${len} characters`,
};
