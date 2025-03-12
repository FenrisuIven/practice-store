const zod = require("zod");

const {
  maxLengthRegister: maxLength,
  minLengthRegister: minLength,
} = require("../../../src/util/getErrorMessage");

module.exports.userRegistrationSchema = zod
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    code: "passwords_mismatch",
    message: "Passwords do not match",
    path: ["password", "passwordConfirm"],
  });
