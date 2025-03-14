const { Router } = require("express");
const router = Router();

const { userSchema } = require("../schema/user/userSchema");

const validateInput = (req, res) => {
  const { _csrf, ...dataToCheck } = req.body;

  console.log({ dataToCheck });

  const validateRes = userSchema.safeParse(dataToCheck);
  console.log(validateRes.error);
  if (validateRes.error) {
    res.status(400).send(validateRes);
    return;
  }
  res.status(200).send(validateRes);
};

router.post("/", validateInput);

module.exports = router;
