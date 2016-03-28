var express = require('express');
var path = require('path');
var routes = {};

var User = require(path.join(__dirname,'../models/studentDataModel')).user;
var Attendence = require(path.join(__dirname,'../models/studentDataModel')).attendence;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;

routes.GEThome = function (req, res, next) {
  res.sendFile('main.html', { root: path.join(__dirname, '../views') });
}

routes.POSTlogin = function (req, res, next) {
  res.json({message: 'test'});
}

routes.POSTregister = function (req, res, next) {
  res.json({message: 'test'});
}

routes.GETindex = function (req, res, next){
  res.sendFile('main.html', { root: path.join(__dirname, '../views') });
  // res.json({message: 'test'});
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