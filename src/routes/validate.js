const { Router } = require("express");
const router = Router();

const { userSchema } = require("../schema/user/userSchema");

const validateInput = (req, res, schema) => {
  const { _csrf, ...dataToCheck } = req.body;

  const validateRes = schema.safeParse(dataToCheck);

  if (validateRes.error) {
    res.status(400).send(validateRes);
    return;
  }
  res.status(200).send(validateRes);
};

router.post("/register", (req, res) => {
  const registerSchema = userSchema.refine(
    (data) => data.password === data.passwordConfirm,
    {
      code: "passwords_mismatch",
      message: "Passwords do not match",
      path: ["password", "passwordConfirm"],
    }
  );
  validateInput(req, res, registerSchema);
});
router.post("/login", (req, res) => {
  const loginSchema = userSchema.omit({
    email: true,
    passwordConfirm: true,
  });
  validateInput(req, res, loginSchema);
});

module.exports = router;
