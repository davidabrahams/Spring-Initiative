var express = require('express');
var path = require('path');
var router = express.Router();
var path = require('path');
var passport = require('passport');

var User = require(path.join(__dirname,'../models/user'));
var Attendence = require(path.join(__dirname,'../models/studentDataModel')).attendence;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
  if (err) { return res.status(500).send(err.message); }
  if (!user) { return res.status(401)
    .send("A user with that password could not be found.");}
  req.logIn(user, function(err) {
    if (err) { return next(err); }
    return res.send({redirect: '/'});
  });
  })(req, res, next);
});

router.get('/login', function(req, res){
  //POST login
  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});


router.post('/register', function(req, res) {
  console.log(JSON.stringify(req.body));
  // User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
  //   console.log('here');
  //   console.log(err);
  //   if (err) {
  //     return res.status(500).send(err.message);
  //   }

  //   passport.authenticate('local')(req, res, function () {
  //     res.send({redirect: '/'});
  //   });
  // });
});

router.get('/index', function(req, res){
  //GET index
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.get('/program', function(req, res){
  //GET program
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.get('/student', function(req, res){
  //GET student
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/student/add', function(req, res){
  //Add new student
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/student/edit', function(req, res){
  //Edit existing student
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.get('/student/archive', function(req,res){
  //GET archived students
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
