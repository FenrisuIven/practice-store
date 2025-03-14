const csrf = require("csurf");

const app = require("./src/controller/setup/app");
const db = require("./src/controller/setup/database");

const userRoutes = require("./src/routes/user");
const authRoutes = require("./src/routes/auth");
const validateRoutes = require("./src/routes/validate");
const cabinetRoutes = require("./src/routes/cabinet");

const sequel = require("./src/util/database");
const User = require("./src/models/user");

db.useSequelizeStore(app);
db.setupRelations();

app.use(csrf());

app.use((req, res, next) => {
  if (req.session.user) {
    User.findByPk(req.session.user.id)
      .then((user) => {
        req.session.isLogged = true;
        req.user = user;
        next();
      })
      .catch((err) => {
        //console.log(err);
      });
  } else {
    req.session.isLogged = false;
    next();
  }
});

app.use("/validate", validateRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/cabinet", cabinetRoutes);

sequel
  .sync()
  .then(() => {
    app.listen(3000);
    console.log("Server listening on: http://localhost:3000");
  })
  .catch((err) => {
    console.log(`${err.parent.code} : ${err.toString()}`);
  });
