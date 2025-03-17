const { Router } = require("express");
const router = Router();

const { getMainPage, getOrders, getProfile } = require("../controller/user");
const { getCart, postAddToCart } = require("../controller/cart");
const { postProduct } = require("../controller/product");
const { isAuth } = require("../controller/auth");

router.get("/", getMainPage);
router.get("/cart", isAuth, getCart);
router.get("/orders", isAuth, getOrders);
router.get("/profile", isAuth, getProfile);

router.post("/product", postProduct);
router.post("/add-to-cart/", isAuth, postAddToCart);

module.exports = router;
