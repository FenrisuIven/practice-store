const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
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
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      // console.log(err);
    });
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  req.user
    .getProducts({ where: { id: req.params.productId } })
    .then((products) => {
      const product = products[0];
      if (!product) throw Error("entry not found");
      res.render("admin/edit-product.pug", {
        pageTitle: "Edit",
        csrfToken: req.csrfToken(),
        buttonCaption: "Save Changes",
        productId: req.params.productId,
        product: product.dataValues,
      });
    })
    .catch((err) => {
      // console.log(err);
    });
};

exports.postEditProduct = (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.productId,
    },
  }).catch((err) => {
    // console.log(err);
  });
  res.redirect("/admin/products");
};

exports.getAdminProducts = (req, res) => {
  Product.findAll({
    where: {
      userId: req.user.id,
    },
  }).then((products) => {
    console.log(products);
    const productsToDisplay = Product.getProductsToDisplay(products);
    console.log({ productsToDisplay });
    res.render("admin/products-list.pug", {
      pageTitle: `${req.user.username}'s created products`,
      csrfToken: req.csrfToken(),
      isLogged: req.session.isLogged,
      username: req.user.username,
      products: productsToDisplay,
    });
  });
};
