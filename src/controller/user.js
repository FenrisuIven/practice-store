const Product = require("../models/product");

module.exports.getMainPage = async (req, res) => {
  Product.findAll({
    attributes: Product.getAttributesKeys({
      exclude: ["updatedAt", "description"],
    }),
    order: [["updatedAt", "DESC"]],
  })
    .then((products) => {
      const displayMoreButton = products.length > 5;

      const productsToDisplay = Product.getProductsToDisplay(
        displayMoreButton ? products.slice(0, 5) : products
      );

      //TODO: add a way to define settings for each rendered product, mainly in products-display.pug itself
      res.render("shop/main-page.pug", {
        pageTitle: "Main",
        csrfToken: req.csrfToken(),
        isLogged: req.session.isLogged,
        username: req.session.isLogged ? req.user.username : null,
        prods: productsToDisplay,
        categories: Array.from({ length: 1 }),
        displayCategoryName: true,
        displayMoreButton,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findByPk(productId).then((product) => {
    res.render("product.pug", {
      pageTitle: targetProduct.title,
      isLogged: req.session.isLogged,
      username: req.user.username,
      product: targetProduct,
    });
  });
};

module.exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log(cart);
      cart.getProducts().then((products) => {
        res.render("user/cart.pug", {
          pageTitle: "Cart",
          isLogged: req.session.isLogged,
          username: req.user.username,
          prods: products,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postAddToCart = async (req, res) => {
  const productId = req.body.productId;

  let prevQuantity;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      let newQuantity = 1;
      if (product) {
        prevQuantity = product.cartItem.quantity;

        return fetchedCart.addProduct(product, {
          through: {
            quantity: newQuantity + product.cartItem.quantity,
          },
        });
      }

      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: {
              quantity: newQuantity,
            },
          });
        })
        .catch((err) => err);
    })
    .then(async (data) => {
      const products = await fetchedCart.getProducts({
        where: {
          id: productId,
        },
      });
      return Promise.resolve({
        product: products[0],
        data,
      });
    })
    .then((result) => {
      const cartItem = result.product.cartItem;

      res.status(200).send(
        JSON.stringify({
          //placeholder response
          data:
            result.data[0] === 1
              ? {
                  product: result.product,
                  productCartItem: cartItem,
                  amountAdded:
                    prevQuantity < cartItem.quantity
                      ? cartItem.quantity - prevQuantity
                      : 0,
                  newQuantity: cartItem.quantity,
                }
              : null,
        })
      );
    })
    .catch((err) => {
      // console.log(err);
    });
};

module.exports.getProfile = (req, res) => {
  console.log(req.user);
  res.render("user/profile.pug", {
    pageTitle: `${req.user.username}`,
    isLogged: req.session.isLogged,
    username: req.user.username,
    user: req.user,
  });
};

module.exports.getOrders = (req, res) => {
  res.render("user/orders.pug", {
    pageTitle: "Orders",
    isLogged: req.session.isLogged,
    username: req.user.username,
  });
};
