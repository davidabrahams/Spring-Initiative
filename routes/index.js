var express = require('express');
var path = require('path');
var router = express.Router();
var path = require('path');
var User = require(path.join(__dirname,'../models/studentDataModel')).user;
var Attendence = require(path.join(__dirname,'../models/studentDataModel')).attendence;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/login', function(req, res){
  //POST login
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.post('/register', function(req, res){
  //POST register
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
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

module.exports = router;
