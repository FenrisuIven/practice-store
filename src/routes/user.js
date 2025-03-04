const { Router } = require('express');
const router = Router();

const {
  getMainPage, getCart, getOrders, postAddToCart
} = require('../controller/user');
const {
  isAuth, getLogin, postLogin, getLogout
} = require('../controller/auth');

router.get('/', getMainPage);
router.get('/cart', getCart);
router.get('/orders', isAuth, getOrders);
router.get('/login', getLogin);
router.get('/logout', isAuth, getLogout);

router.post('/add-to-cart/', isAuth, postAddToCart);
router.post('/login', postLogin);

module.exports = router;