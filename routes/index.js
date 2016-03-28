var express = require('express');
var routes = {};
var path = require('path');
var passport = require('passport');

var User = require(path.join(__dirname,'../models/user'));
var Attendence = require(path.join(__dirname,'../models/data')).attendence;
var Data = require(path.join(__dirname,'../models/data')).data;
var Student = require(path.join(__dirname,'../models/student'));
var Grades = require(path.join(__dirname,'../models/data')).grades;

// routes.GEThome = function (req, res, next) {
//   res.sendFile('main.html', { root: path.join(__dirname, '../public') });
// }

routes.GETindex = function (req, res, next){
  if (req.user)
    res.sendFile('main.html', { root: path.join(__dirname, '../public') });
  else
    console.log('no user');
    res.sendStatus(401);
}

routes.GETlogin = function(req, res){
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
}

routes.POSTlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)
      return res.status(500).send(err.message);
    if (!user)
      return res.status(401).send(info.message);
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({redirect: '/'});
    });
  })(req, res, next);
}

routes.POSTregister = function(req, res, next) {
  User.register(new User({ email: req.body.username }), req.body.password,
                function(err, user) {
    if (err) {
      console.log('error while user register!', err); return next(err);
    }
    console.log('user registered!');

    passport.authenticate('local')(req, res, function () {
      res.send({redirect: '/'});
    });
  });
}

routes.GETprogram = function (req, res, next) {
  res.json({message: 'test'});
}

routes.GETstudent = function (req, res, next) {
  Student.find({}, function (err, student){
    res.json({students: student});
  });
}

routes.POSTeditstudent = function (req, res, next) {
  res.json({message: 'test'});
}

routes.POSTaddstudent = function (req, res, next) {
  res.json({message: 'test'});
}

routes.GETarchive = function (req, res, next) {
  res.json({message: 'test'});
}

module.exports = routes;
