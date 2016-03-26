var express = require('express');
var path = require('path');
var routes = {};
var path = require('path');

var User = require(path.join(__dirname,'../models/studentDataModel')).user;
var Attendence = require(path.join(__dirname,'../models/studentDataModel')).attendence;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;

routes.GEThome = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTlogin = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTregister = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETindex = function(req, res){
	// Student.find
	// res.JSON({students: allStudents});
}

routes.GETprogram = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTeditstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTaddstudent = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETarchive = function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

module.exports = routes;