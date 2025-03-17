const Product = require("../models/product");

module.exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      cart.getProducts().then((products) => {
        res.render("user/cart.pug", {
          pageTitle: "Cart",
          isLogged: req.session.isLogged,
          username: req.user.username,
          products,
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
      console.log(err);
    });
};
