const { Router } = require('express');
const router = Router();

const {
  getAddProduct, getEditProduct, postEditProduct
} = require('../controller/admin');

router.get('/add-product', getAddProduct);
router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product/:productId', postEditProduct)

module.exports = router;