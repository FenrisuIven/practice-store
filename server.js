const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const csrf = require("csurf");

const rootPath = require("./src/util/rootPath");
const userRoutes = require("./src/routes/user");
const validateRoutes = require("./src/routes/validate");
const cabinetRoutes = require("./src/routes/cabinet");

const sequel = require("./src/util/database");
const Product = require("./src/models/product");
const User = require("./src/models/user");
const Cart = require("./src/models/cart");
const CartItem = require("./src/models/cartItem");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootPath("public")));
app.use(express.json());
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
app.use(csrf());

app.set("view engine", "pug");
app.set("views", "src/views");

app.use((req, res, next) => {
  if (req.session.user) {
    User.findByPk(req.session.user.id)
      .then((user) => {
        req.session.isLogged = true;
        req.user = user;
        next();
      })
      .catch((err) => {
        //console.log(err);
      });
  } else {
    req.session.isLogged = false;
    next();
  }
});

app.use("/validate", validateRoutes);
app.use("/", userRoutes);
app.use("/cabinet", cabinetRoutes);

Product.belongsTo(User, {
  constrains: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequel
  .sync()
  .then(() => {
    app.listen(3000);
    console.log("Server listening on: http://localhost:3000");
  })
  .catch((err) => {
    console.log(`${err.parent.code} : ${err.toString()}`);
  });
