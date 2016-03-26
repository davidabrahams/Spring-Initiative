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

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('logged in!');
});

router.get('/login', function(req, res){
  //POST login
  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
});

router.post('/register', function(req, res, next) {
  User.register(new User({ email: req.body.username }), req.body.password,
                function(err) {
    if (err) {
      console.log('error while user register!', err); return next(err);
    }
    console.log('user registered!');
  });
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
