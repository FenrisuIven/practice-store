const rootPath = require('../util/rootPath');
const { readFromFile } = require('../util/readFromFile');

module.exports.getMainPage = (req, res) => {
  readFromFile(rootPath('./data/data.json'), (data) => {
    console.log(req.originalUrl)
    res.render('main-page.pug', {
      pageTitle: 'Main',
      prods: data
    });
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