const { Router } = require('express');
const router = Router();

const {
  getMainPage, getCart, getOrders
} = require('../controller/user');

router.get('/', getMainPage);
router.get('/cart', getCart);
router.get('/orders', getOrders);

module.exports = router;