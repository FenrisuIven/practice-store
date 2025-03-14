const Product = require("../models/product");

module.exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findByPk(productId).then((product) => {
    res.render("product.pug", {
      pageTitle: -roduct.title,
      isLogged: req.session.isLogged,
      username: req.user.username,
      product,
    });
  });
};
