const User = require('../models/user');

const bcrypt = require('bcrypt')

module.exports = {
  isAuth(req, res, next){
    if(!req.session.isLogged) {
      return res.redirect('/');
    }
    next();
  },
  getLogin(req, res) {
    res.render('user/login.pug', {
      pageTitle: 'Login'
    })
  },
  postLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
      username: username
    }).then (user => {
      if (!user) res.redirect('/login');

      bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          if(passwordsMatch) {
            req.session.isLogged = true;
            req.session.user = user; 
            return req.session.save(err => {
              res.redirect('/');
            })
          } 
          res.redirect('/login');
        })
    })

  },
  getLogout(req, res) {
    console.log(req.session);
    res.session.destroy(err => {
      res.redirect('/');
    });
  }
};