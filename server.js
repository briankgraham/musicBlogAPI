var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var db = require('./app/config');
var User = require('./app/user');
var Users = require('./app/users');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: "shhh",
  resave: false,
  saveUninitialized: true
}));

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/#/signup');
    if (err) console.log(err);
  });
});

app.post('/api/users', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username}).fetch().then(function(found) {
    if (!found) {
      bcrypt.hash(password, null, null, function (err, hash) {
        Users.create({
          username: username,
          password: hash
        })
        .then(function (user) {
          req.session.regenerate(function (err) {
            req.session.user = username;
          });
          console.log('user added successfully');
          res.redirect('/');
        });
      });
    } else {
     console.log('user exists'); 
     res.redirect('/signup');
    }
  });

});


app.listen(3000, function () {
  console.log('listening on 3k');
});

