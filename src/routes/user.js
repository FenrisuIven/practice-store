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

const { userRegistrationSchema } = require("../schema/user/registration");

router.get("/../../public/schema/user/registratio");
router.get("/cart", getCart);
router.get("/orders", isAuth, getOrders);
router.get("/login", getLogin);
router.get("/logout", isAuth, getLogout);
router.get("/register", getRegistration);
router.get("/profile", isAuth, getProfile);

router.post("/add-to-cart/", isAuth, postAddToCart);
router.post("/login", postLogin);
router.post("/register", (req, res, next) => {
  const { _csrf, ...dataToCheck } = req.body;

  console.log({ dataToCheck });

  const validateRes = userRegistrationSchema.safeParse(dataToCheck);
  console.log(validateRes.error);
  if (validateRes.error) {
    res.status(400).send(validateRes);
  }
});

module.exports = router;
