const Product = require("../models/product");

// fetch request to display modal popup with product details
module.exports.postProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      console.log(product);
      if (!product) {
        res
          .status(404)
          .send({ message: "Product with target ID was not found." });
      } else {
        res.status(200).send(product.dataValues);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
