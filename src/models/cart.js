const Sequelize = require('sequelize');

const sequel = require('../util/database');

const Cart = sequel.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: true,
  updatedAt: false
});

module.exports = Cart;