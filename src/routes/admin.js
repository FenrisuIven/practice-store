const { Router } = require('express');
const router = Router();

const {
  getAddProduct, getEditProduct, getAdminProducts, postAddProduct, postEditProduct
} = require('../controller/admin');

router.get('/add-product', getAddProduct);
router.get('/edit-product/:productId', getEditProduct);
router.get('/products', getAdminProducts);

router.post('/add-product', postAddProduct)
router.post('/edit-product/:productId', postEditProduct);

module.exports = router;