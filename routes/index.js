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

router.get('/student/:_id', function(req, res){
  //GET student
   Student.find({_id: req.params._id}, function(err, currentStudent){
   	res.json(currentStudent);
   })
});

router.post('/student/add', function(req, res){
  //Add new student

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



});

router.post('/student/edit/:_id', function(req, res){
  //Edit existing student


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
});

router.post('/student/newEntry/:_id', function(req,res){
  //POST new Student entry
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
  
});


router.get('/student/archive', function(req,res){
  //GET archived students
  Student.find({archived: true}, function(err, archivedStudents){
  	res.json(archivedStudents);
  })
});

module.exports = router;
