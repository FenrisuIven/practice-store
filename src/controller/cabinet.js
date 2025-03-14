const Product = require("../models/product");
const {
  getProductsToDisplay,
} = require("../models/utils/getProductsToDisplay");

exports.getAddProduct = (req, res) => {
  res.render("cabinet/add-product", {
    pageTitle: "Add Product",
    csrfToken: req.csrfToken(),
    isLogged: req.session.isLogged,
    username: req.user.username,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description, category } = req.body;
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
      category,
      rating: 0,
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  req.user
    .getProducts({ where: { id: req.params.productId } })
    .then((products) => {
      const product = products[0];
      if (!product) throw Error("entry not found");
      res.render("cabinet/edit-product.pug", {
        pageTitle: "Edit",
        csrfToken: req.csrfToken(),
        buttonCaption: "Save Changes",
        productId: req.params.productId,
        product: product.dataValues,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.productId,
    },
  }).catch((err) => {
    console.log(err);
  });
  res.redirect("/cabinet/products");
};

exports.getCabinetProducts = (req, res) => {
  Product.findAll({
    where: {
      userId: req.user.id,
    },
  }).then((products) => {
    const productsToDisplay = getProductsToDisplay(products);

    res.render("cabinet/products-list.pug", {
      pageTitle: `${req.user.username}'s created products`,
      csrfToken: req.csrfToken(),
      isLogged: req.session.isLogged,
      username: req.user.username,
      products: productsToDisplay,
    });
  });
};
