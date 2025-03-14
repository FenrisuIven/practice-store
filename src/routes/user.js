const { Router } = require("express");
const router = Router();

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

router.get("/", getMainPage);
router.get("/cart", getCart);
router.get("/orders", isAuth, getOrders);
router.get("/profile", isAuth, getProfile);
router.get("/logout", isAuth, getLogout);
router.get("/login", getLogin);
router.get("/register", getRegistration);

router.post("/add-to-cart/", isAuth, postAddToCart);
router.post("/login", postLogin);
router.post("/register", postRegistration);

module.exports = router;
