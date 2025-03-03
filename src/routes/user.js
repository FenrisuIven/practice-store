const { Router } = require('express');
const router = Router();

const {
  getMainPage, getCart, getOrders, postAddToCart
} = require('../controller/user');

router.get('/', getMainPage);
router.get('/cart', getCart);
router.get('/orders', getOrders);

router.post('/add-to-cart/', postAddToCart)

module.exports = router;