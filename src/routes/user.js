const { Router } = require('express');
const router = Router();

const {
  getMainPage
} = require('../controller/user');

router.get('/', getMainPage);

module.exports = router;