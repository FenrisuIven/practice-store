const bodyParser = require("body-parser");
const express = require("express");

const rootPath = require("../../util/rootPath");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootPath("public")));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "src/views");

module.exports = app;
