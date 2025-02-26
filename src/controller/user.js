const rootPath = require('../util/rootPath');
const { queryTable } = require('../util/queryTable');

module.exports.getMainPage = async (req, res) => {
  const queryRes = await queryTable('SELECT * FROM product LIMIT 6');
  const products = queryRes.rows ? queryRes.rows : [];
  const displayMoreButton = products.length > 5;

  if (displayMoreButton) {
    products.splice(5, 1);
  }

  res.render('main-page.pug', {
    pageTitle: 'Main',
    prods: products,
    displayMoreButton
  });
}

module.exports.getCart = (req, res) => {
  res.render('cart.pug', {
    pageTitle: 'Cart'
  });
}

module.exports.getOrders = (req, res) => {
  res.render('orders.pug', {
    pageTitle: 'Orders'
  });
}