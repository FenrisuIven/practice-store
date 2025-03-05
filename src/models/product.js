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
    type: Sequelize.STRING, //switch to a foreign key for table 'categories', but later
    allowNull: false,
  },
});

module.exports = Product;

module.exports.getAttributesKeys = (params) => {
  let keys = Object.keys(Product.rawAttributes);
  if (Array.isArray(params.exclude)) {
    keys = keys.filter((key) => !params.exclude.includes(key));
  }
  return keys;
};

module.exports.getProductsToDisplay = (products) => {
  const productsToDislpay = products.map((product) => {
    const creationDateTime = product.dataValues.createdAt
      .toLocaleString()
      .split(", ");
    const creationFullDate = creationDateTime[0];
    const creationHoursMinutes = creationDateTime[1]
      .split(":")
      .slice(0, 2)
      .join(":");
    // console.log(creationHoursMinutes)
    return {
      ...product.dataValues,
      creationDate: creationFullDate,
      creationTime: creationHoursMinutes,
    };
  });
  return productsToDislpay;
};
