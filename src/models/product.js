const Sequelize = require('sequelize');

const sequel = require('../util/database');

//TODO: check if types are correct
const Product = sequel.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 10,
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING, //switch to a foreign key for table 'categories', but later
    allowNull: false
  }
});

module.exports = Product;

module.exports.getAttributesKeys = (params) => {
  let keys = Object.keys(Product.rawAttributes);
  if (Array.isArray(params.exclude)) {
    keys = keys.filter(key => !params.exclude.includes(key))
  }
  return keys;
}