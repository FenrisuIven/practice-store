const zod = require("zod");

const { maxLength, minLength } = require("../../util/getErrorMessage");

module.exports.userSchema = zod.object({
  username: zod
    .string()
    .min(4, { message: minLength("Username", 4) })
    .max(16, { message: maxLength("Username", 16) }),
  email: zod.string().email({ message: "Make sure to use valid email." }),
  password: zod
    .string()
    .min(8, { message: minLength("Password", 8) })
    .max(32, { message: maxLength("Password", 32) }),
  passwordConfirm: zod
    .string()
    .min(8, { message: minLength("Password", 8) })
    .max(32, { message: maxLength("Password", 32) }),
});
