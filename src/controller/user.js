const Product = require("../models/product");
const { getAttributesKeys } = require("../models/utils/getAttributesKeys");
const {
  getProductsToDisplay,
} = require("../models/utils/getProductsToDisplay");

module.exports.getMainPage = async (req, res) => {
  Product.findAll({
    attributes: getAttributesKeys(Product, {
      exclude: ["updatedAt", "description"],
    }),
    order: [["updatedAt", "DESC"]],
  })
    .then((products) => {
      const displayMoreButton = products.length > 5;

      const productsToDisplay = getProductsToDisplay(
        displayMoreButton ? products.slice(0, 5) : products
      );

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

module.exports.getProfile = (req, res) => {
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
