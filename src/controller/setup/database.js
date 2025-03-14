const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequel = require("../../util/database");
const Product = require("../../models/product");
const User = require("../../models/user");
const Cart = require("../../models/cart");
const CartItem = require("../../models/cartItem");

module.exports.useSequelizeStore = (app) => {
  app.use(
    session({
      secret: "string to encode data with",
      store: new SequelizeStore({
        db: sequel,
        collection: "sessions",
        checkExpirationInterval: 10 * 60 * 1000,
        expiration: 15 * 60 * 1000,
      }),
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 15 * 60 * 1000,
      },
      unset: "destroy",
    })
  );
};

module.exports.setupRelations = () => {
  Product.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
};
