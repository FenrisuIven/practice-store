const Sequelize = require('sequelize');

const sequel = require('../util/database');

const User = sequel.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = User;