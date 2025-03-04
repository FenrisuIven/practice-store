const User = require('../models/user');

const bcrypt = require('bcrypt');

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

    User.findOne({ where: {
      username
    }}).then (user => {
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
  },
  getRegistration(req, res) {
    res.render('user/registration.pug');
  },
  async postRegistration(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const pass = req.body.password;
    const confirmPass = req.body.password;


    const isUserDefined = await User.findOne({where: { email }})
      .then(user => {
        console.log(user)
        if (user) return true;
        return User.findOne({where: { username }});
      })
      .then(user => {
        console.log(user)
        if(user) return true;
        return false
      });

    if(isUserDefined || pass !== confirmPass) {
      console.log(pass !== confirmPass)
      console.log(isUserDefined)
      console.log('error')
      res.redirect('/register');
      return;
    }

    const encryptedPass = await bcrypt.hash(pass, 12);

    const user = new User({
      username: username,
      email: email,
      password: encryptedPass,
      cart: { items: [] }
    });
    user.createCart();
    user.save();

    res.redirect('/login');
  }
};