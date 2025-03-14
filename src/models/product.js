const Sequelize = require("sequelize");

const sequel = require("../util/database");

const Product = sequel.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      max: 5,
      min: 0,
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
