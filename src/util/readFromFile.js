const fs = require('fs');

module.exports.readFromFile = (path, callback) => {
  fs.readFile(path, (err, data) => {
    let itemsArray = []
    if (!err) itemsArray = JSON.parse(data);
    callback(itemsArray);
  })
}