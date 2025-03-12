module.exports = {
  minLengthRegister: (attr, len) =>
    `${attr} must contain at least ${len} characters`,
  maxLengthRegister: (attr, len) =>
    `${attr} cannot be longer than ${len} characters`,

  minLengthLogin: (attr, len) => `${attr}'s are at least ${len} characters`,
  maxLengthLogin: (attr, len) =>
    `${attr}'s are not longer than ${len} characters`,
};
