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

    let lastUpdate, updateFullDate, updateHoursMinutes;
    if (product.dataValues.updatedAt) {
      lastUpdate = product.dataValues.updatedAt.toLocaleString().split(", ");
      updateFullDate = lastUpdate[0];
      updateHoursMinutes = lastUpdate[1].split(":").slice(0, 2).join(":");
    }

    return {
      ...product.dataValues,
      creationDate: creationFullDate,
      creationTime: creationHoursMinutes,
      updateDate: updateFullDate,
      updateTime: updateHoursMinutes,
    };
  });
  return productsToDislpay;
};
