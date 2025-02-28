const Product = require('../models/product');

module.exports.getMainPage = async (req, res) => {
  Product.findAll({
    attributes: Product.getAttributesKeys({
      exclude: ['id', 'updatedAt', 'description']
    }),
    order: [['updatedAt', 'DESC']]
  })
    .then(products => {
      const displayMoreButton = products.length > 5;
      if (displayMoreButton) products.splice(5, 1);

      //TODO: move somewhere
      let productsToDisplay = products.map(product => {
        const creationDateTime = product.dataValues.createdAt.toLocaleString().split(', ');
        const creationFullDate = creationDateTime[0];
        const creationHoursMinutes = creationDateTime[1].split(':').slice(0, 2).join(':');
        console.log(creationHoursMinutes)
        return {
          ...product.dataValues,
          creationDate: creationFullDate,
          creationTime: creationHoursMinutes
        }
      })
      console.log(productsToDisplay)

      const fillAmounts = Array.from({ length: 5 }).fill('100%', 0, 4);
      fillAmounts[4] = '15%';
      console.log(fillAmounts)

      //TODO: add a way to define settings for each rendered product, mainly in products-display.pug itself
      res.render('shop/main-page.pug', {
        pageTitle: 'Main',
        prods: productsToDisplay,
        categories: Array.from({ length: 1 }),
        displayCategoryName: true,
        displayMoreButton,

        starSettings: {
          fillAmounts
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  /*Product.findById(productId).then(products => {
    const targetProduct = products[0];
    res.render('product.pug', {
      pageTitle: targetProduct.title,
      product: targetProduct
    });
  })*/
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