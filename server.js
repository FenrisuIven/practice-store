const bodyParser = require('body-parser');
const express = require('express');

const rootPath = require('./src/util/rootPath');
const userRoutes = require('./src/routes/user');
const adminRoutes = require('./src/routes/admin');
const sequel = require('./src/util/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootPath('public')));
app.set('view engine', 'pug');
app.set('views', 'src/views')

app.use('/', userRoutes);
app.use('/admin', adminRoutes);

sequel.sync()
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });