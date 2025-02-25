const bodyParser = require('body-parser');
const express = require('express');

const rootPath = require('./src/util/rootPath');
const userRoutes = require('./src/routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootPath('public')));
app.set('view engine', 'pug');
app.set('views', 'src/views')

app.use('/', userRoutes);

app.listen(3000);