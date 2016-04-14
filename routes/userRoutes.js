var express = require('express');
var routes = {};
var path = require('path');
var passport = require('passport');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME,
                                   process.env.SENDGRID_PASSWORD);

var User = require(path.join(__dirname, '../models/user'));

routes.POSTlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)
      return res.status(500).send(err.message);
    if (!user)
      return res.status(401).send(info.message);
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  })(req, res, next);
}

routes.POSTlogout = function(req, res){
  console.log("logged out")
  req.logout();
  res.sendStatus(200);
}

routes.POSTregister = function(req, res, next) {
  User.register(new User({
      email: req.body.username
    }), req.body.password,
    function(err, user) {
      if (err) {
        return res.status(403).send(err.message);
      }

      // Get admin emails
      User.find({isAdmin: true}, {email: 1, _id: 0}, function(err, admins) {
        // send email verification to admins
        var half = user.authToken.length / 2;
        var firstHalfAuth = user.authToken.slice(0, half);
        var secondHalfAuth = user.authToken.slice(half);
        var authenticationURL = 'http://' + req.headers.host +
          '/verify?authTokenAdmin=' + firstHalfAuth +
          '&email=' + user.email;
        var email = new sendgrid.Email();

        for (var i = 0; i < admins.length; i++) {
          email.addTo(admins[i].email);
        };

        email.setFrom('SpringInitiative@olinjs.com');
        email.setSubject(user.email + ' wants to register for Spring Initiative\'s website.');
        email.setHtml('<a target=_blank href=\"' + authenticationURL +
          '\">Confirm their registration.</a>' +
          '<br>This is an automated response. Do not reply.');
        sendgrid.send(email);

        // send email verification to user
        authenticationURL = 'http://' + req.headers.host +
          '/verify?authTokenUser=' + secondHalfAuth +
          '&email=' + user.email;

        var email2 = new sendgrid.Email();
        email2.addTo(user.email);
        email2.setFrom('SpringInitiative@olinjs.com');
        email2.setSubject('Register for Spring Initiative\'s website.');
        email2.setHtml('<a target=_blank href=\"' + authenticationURL +
          '\">Confirm your registration.</a>' +
          '<br>This is an automated response. Do not reply.');
        sendgrid.send(email2);

        console.log("Email verification sent");
        res.sendStatus(200);
      });

    });
}

routes.GETemailver = function(req, res) {
  User.findOne({email: req.query.email}, function (err, user){
    // fill in model with authTokens
    if(req.query.authTokenAdmin !== undefined){
      user.adminAuth = req.query.authTokenAdmin;
      user.save(function (err){
        if (err) console.log('Update error:', err);
        else checkAuth(user, res);
      });
    } else if(req.query.authTokenUser !== undefined) {
      user.userAuth = req.query.authTokenUser;
      user.save(function (err){
        if (err) console.log('Update error:', err);
        else checkAuth(user, res);
      });
    }
    res.redirect('/login');
  });
}

var checkAuth = function (user, res){
  if(user.adminAuth !== null && user.userAuth !== null){
    console.log('\n\nyay\n\n');
    var authToken = user.adminAuth + user.userAuth;
    User.verifyEmail(authToken, function(err, existingAuthToken) {
      if (err) {
        console.log('Email ver err:', err);
        res.sendStatus(500);
      }
      else {
        var email = new sendgrid.Email();
        email.addTo(user.email);
        email.setFrom('SpringInitiative@olinjs.com');
        email.setSubject('Registration complete for Spring Initiative');
        email.setHtml('You\'ve been registered for Spring Initiative\'s website.' +
                      '<br>This is an automated response. Do not reply.');
        sendgrid.send(email);

        console.log("Email alert sent");
      }
    });
  }
}

routes.GETallUsers = function(req, res) {
  User.find({}, function(err, allUsers) {
    res.json(allUsers);
  })
}

routes.POSTchangeAdmin = function(req, res) {
  var userid = req.params._id;
  User.findOne({_id:userid}, function (err, user) {
    user.isAdmin = !user.isAdmin;
    user.save(function (err) {
      if(err) console.log(err);
    });
    res.json(user);
  });
}

routes.POSTchangePassword = function(req, res) {
  var userid = req.params._id;
  var newPasswordString = req.body.password;
  User.findOne({_id:userid}, function (err, user) {
    user.setPassword(newPasswordString, function(){
      user.save(function (err) {
        if(err) {
          console.log(err);
          return res.status(500).json({msg: 'Password reset unsuccessful'})
        }
      });
      return res.status(200).json({msg: 'Password reset successful'});
    });
  });
}

module.exports = routes;
