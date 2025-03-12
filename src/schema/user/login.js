const zod = require("zod");

const {
  minLengthLogin,
  maxLengthLogin,
} = require("../../../src/util/getErrorMessage");

module.exports.userLoginSchema = zod.object({
  username: zod
    .string()
    .min(4, { message: minLengthLogin("Username", 4) })
    .max(16, { message: maxLengthLogin("Username", 16) }),
  password: zod
    .string()
    .min(8, { message: minLengthLogin("Password", 8) })
    .max(32, { message: maxLengthLogin("Password", 32) }),
});
