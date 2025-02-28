const Sequelize = require('sequelize');

const sequel = new Sequelize('practice-store', 'local', 'local', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequel;