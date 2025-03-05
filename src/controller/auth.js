const User = require("../models/user");

const bcrypt = require("bcrypt");

module.exports = {
  isAuth(req, res, next) {
    if (!req.session.isLogged) {
      console.log("not authed, redir");
      return res.redirect("/");
    }
    next();
  },
  getLogin(req, res) {
    res.render("user/login.pug", {
      pageTitle: "Login",
      csrfToken: req.csrfToken(),
    });
  },
  postLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.redirect("/login");
        return;
      }

      bcrypt.compare(password, user.password).then((passwordsMatch) => {
        if (passwordsMatch) {
          req.session.isLogged = true;
          req.session.user = user;
          return req.session.save((err) => {
            res.redirect("/");
          });
        }
        res.redirect("/login");
      });
    });
  },
  getLogout(req, res) {
    delete req.session;
    res.redirect("/");
  },
  getRegistration(req, res) {
    res.render("user/registration.pug", {
      pageTitle: "Sign Up",
      csrfToken: req.csrfToken(),
    });
  },
  async postRegistration(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const pass = req.body.password;
    const confirmPass = req.body.password;

    if (pass !== confirmPass) return;

    const isUserDefined = await User.findOne({ where: { email } })
      .then((user) => {
        if (user) return true;
        return User.findOne({ where: { username } });
      })
      .then((user) => {
        if (user) return true;
        return false;
      });

    if (isUserDefined || pass !== confirmPass) {
      res.redirect("/register");
      return;
    }

    const encryptedPass = await bcrypt.hash(pass, 12);

    User.create({
      username: username,
      email: email,
      password: encryptedPass,
    })
      .then((user) => {
        return user.createCart();
      })
      .then(() => {
        res.redirect("/login");
      });
  },
};
