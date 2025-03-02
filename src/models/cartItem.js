const Sequelize = require('sequelize');

const sequel = require('../util/database');

const CartItem = sequel.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
}, {
  timestamps: true,
  updatedAt: false
});

module.exports = CartItem;