const { Router } = require("express");
const router = Router();
const zod = require("zod");

const {
  getMainPage,
  getCart,
  getOrders,
  postAddToCart,
  getProfile,
} = require("../controller/user");
const {
  isAuth,
  getLogin,
  postLogin,
  getLogout,
  getRegistration,
  postRegistration,
} = require("../controller/auth");

const { userSchema } = require("../schema/user/userSchema");

router.get("/", getMainPage);
router.get("/cart", getCart);
router.get("/orders", isAuth, getOrders);
router.get("/login", getLogin);
router.get("/logout", isAuth, getLogout);
router.get("/register", getRegistration);
router.get("/profile", isAuth, getProfile);

router.post("/add-to-cart/", isAuth, postAddToCart);
router.post("/login", postLogin);
router.post("/register", postRegistration);

const validateInput = (req, res, next, schema) => {
  const { _csrf, ...dataToCheck } = req.body;

  console.log({ dataToCheck });

  const validateRes = schema.safeParse(dataToCheck);
  console.log(validateRes.error);
  if (validateRes.error) {
    res.status(400).send(validateRes);
    return;
  }
  res.status(200).send(validateRes);
};

router.post("/validate", (req, res, next) =>
  validateInput(req, res, next, userSchema)
);

module.exports = router;
