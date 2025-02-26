const rootPath = require('../util/rootPath');
const { readFromFile } = require('../util/readFromFile');

module.exports.getMainPage = (req, res) => {
  readFromFile(rootPath('./data/data.json'), (prodsArray) => {
    let prodsToDisplay = prodsArray;
    let displayMoreButton = false;

    if (prodsArray.length > 5) {
      prodsToDisplay = prodsArray.slice(0, 5);
      displayMoreButton = true;
    }

    res.render('main-page.pug', {
      pageTitle: 'Main',
      prods: prodsToDisplay,
      displayMoreButton
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