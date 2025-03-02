const Product = require('../models/product');

module.exports.getMainPage = async (req, res) => {
  Product.findAll({
    attributes: Product.getAttributesKeys({
      exclude: ['updatedAt', 'description']
    }),
    order: [['updatedAt', 'DESC']]
  })
    .then(products => {
      const displayMoreButton = products.length > 5;
      if (displayMoreButton) products.splice(5, 1);

      const productsToDisplay = Product.getProductsToDisplay(products);

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
  Product.findByPk(productId).then(product => {
    res.render('product.pug', {
      pageTitle: targetProduct.title,
      product: targetProduct
    });
  });
}

module.exports.getCart = (req, res) => {
  req.user.getCart().then(cart => {
    cart.getProducts()
      .then(products => {
        res.render('user/cart.pug', {
          pageTitle: 'Cart',
          prods: products,
          starSettings: {
            fillAmounts: Array.from({ length: 5 }).fill('100%')
          }
        });
      })
  }).catch(err => {
    console.log(err)
  });
}

module.exports.postAddToCart = (req, res) => {
  const productId = req.params.productId;
  console.log({ productId });
  let fetchedCart;

  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({
      where: {
        id: productId
      }
    });
  }).then(products => {
    let product;
    if (products.length > 0) {
      product = products[0];
    }

    let newQuantity = 1;
    if (product) {
      newQuantity += product.cartItem.quantity;
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      });
    }

    return Product.findByPk(productId)
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: {
            quantity: newQuantity
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
    .then(() => {
      res.redirect(req.get("Referrer") || "/");
    })
    .catch(err => {
      console.log(err)
    });
}

module.exports.getOrders = (req, res) => {
  res.render('orders.pug', {
    pageTitle: 'Orders'
  });
}