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
     Student.find({_id: req.params._id}, function(err, currentStudent){
   	res.json(currentStudent);
   })
}

routes.POSTeditstudent = function(req, res, next) {
  
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;
  var studentID = req.params._id;


  Student.update({_id:studentID}, {
	name: studentName,
	program: studentProgram,
	archived: studentArchived
  }, function(err, record){
  	Student.find({}, function(err, allStudents){
  		if(err){res.send(err)}
  		res.json(allStudents)
  	})
  })
}

routes.POSTaddstudent = function(req, res, next) {
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;

  Student.create({
	name: studentName,
	program: studentProgram,
	archived: studentArchived
  }, function(err, newStudent){
  	if(err){res.send(err)}
  	Student.find({}, function(err, allStudents){
  		res.json(allStudents);
  	})
  })
}

routes.POSTnewEntry = function(req, res, next){
	var currentDate = new Date();
  var studentID = req.params._id;
  var studentAttendence = req.body.attendence;
  var studentData = req.body.data;
  var studentGrades = req.body.data;

  var attendID;
  var dataID;
  var gradeID;

  Attendence.create({
  	student: studentID,
  	type: 'attendence',
  	data: studentAttendence,
  	date: currentDate
  }, function(err, newAttendence){
  	  	if(err){res.send(err)}
  	  	attendID = newAttendence._id;
  	  	console.log('new attendence logged')
  })

   Data.create({
  	student: studentID,
  	type: 'data',
  	data: studentData,
  	date: currentDate
  }, function(err, newData){
  	  	if(err){res.send(err)}
  	  	dataID = newData._id;
  	  	console.log('new data logged')

  })

   Grades.create({
  	student: studentID,
  	type: 'data',
  	data: studentGrades,
  	date: currentDate
  }, function(err, newGrade){
  	  	if(err){res.send(err)}
  	  	gradeID = newGrade._id;
  	  	console.log('new grade logged')

  })

   Student.update({_id: studentID},{
   	$addToSet: {attendence: attendID},
   	$addToSet: {grades: gradeID},
   	$addToSet: {data: dataID}
   }, function(err, record){
   	if(err){res.send(err)}
   })

   Student.find({}, function(err, allStudents){
   	res.json(allStudents);
   })
}

routes.GETarchive = function(req, res, next) {
  Student.find({archived: true}, function(err, archivedStudents){
  	res.json(archivedStudents);
  })
}

module.exports = routes;