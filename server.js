const bodyParser = require('body-parser');
const express = require('express');

const rootPath = require('./src/util/rootPath');
const userRoutes = require('./src/routes/user');
const adminRoutes = require('./src/routes/admin');

const sequel = require('./src/util/database');
const Product = require('./src/models/product');
const User = require('./src/models/user');
const Cart = require('./src/models/cart');
const CartItem = require('./src/models/cartItem');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootPath('public')));
app.set('view engine', 'pug');
app.set('views', 'src/views')

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch(err => {
    console.log(err);
  })
})

app.use('/', userRoutes);
app.use('/admin', adminRoutes);

Product.belongsTo(User, {
  constrains: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequel.sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({
        username: 'Fenvi owner',
        email: 'wowowwowow@gmail.com'
      })
    }
    return Promise.resolve(user);
  })
  .then(user => {
    return user.getCart();
  })
  .then(cart => {
    if (!cart) {
      return user.createCart();
    }
    return Promise.resolve(cart);
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });