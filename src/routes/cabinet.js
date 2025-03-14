const { Router } = require("express");
const router = Router();

const {
  getAddProduct,
  getEditProduct,
  getCabinetProducts,
  postAddProduct,
  postEditProduct,
} = require("../controller/cabinet");
const { isAuth } = require("../controller/auth");

router.get("/add-product", isAuth, getAddProduct);
router.get("/edit-product/:productId", isAuth, getEditProduct);
router.get("/products", isAuth, getCabinetProducts);

router.post("/add-product", isAuth, postAddProduct);
router.post("/edit-product/:productId", isAuth, postEditProduct);

module.exports = router;
