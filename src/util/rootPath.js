const path = require('path');

module.exports = (directoryPath) => path.join(require.main.path, directoryPath);