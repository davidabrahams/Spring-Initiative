var express = require('express');
var path = require('path');
var routes = {};
var path = require('path');

var User = require(path.join(__dirname,'../models/studentDataModel')).user;
var Attendance = require(path.join(__dirname,'../models/studentDataModel')).attendance;
var Data = require(path.join(__dirname,'../models/studentDataModel')).data;
var Student = require(path.join(__dirname,'../models/studentDataModel')).student;
var Grades = require(path.join(__dirname,'../models/studentDataModel')).grades;

routes.GEThome = function(req, res, next) {
  // res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTlogin = function(req, res, next) {
  // res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.POSTregister = function(req, res, next) {
  // res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETindex = function(req, res){
	// Student.find
	// res.JSON({students: allStudents});
	Student.find({}, function(err, allStudents){
		res.json(allStudents);
	}) 
}

routes.GETprogram = function(req, res, next) {
  // res.sendFile('index.html', { root: path.join(__dirname, '../views') });
}

routes.GETstudent = function(req, res, next) {
     Student.findOne({_id: req.params._id}, function(err, currentStudent){
      if(err){res.send(err)}
      Student.find({}, function(err, allStudents){
        if(err){res.send(err)}
            res.json({currentStudent: currentStudent, allStudents:allStudents});
      })
   })
}

routes.POSTeditstudent = function(req, res, next) {
  
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;
  var studentID = req.params._id;
  console.log("student attr", studentName, studentProgram, studentArchived)

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
  		res.json({allStudents: allStudents, newStudent: newStudent});
  	})
  })
}

routes.POSTnewEntry = function(req, res, next){
  // var currentDate = new Date();
  var studentID = req.params._id;
  var studentAttendance = req.body.attendance;
  var studentData = req.body.data;
  var studentGrades = req.body.grades;
  var date = req.body.date;
  console.log("formdata", studentID, studentAttendance, studentGrades, studentData, date)


  var attendID = String;
  var dataID = String;
  var gradeID = String;

  Attendance.create({
    student: studentID,
    type: "attendance",
    data: studentAttendance,
    date: date
  }, function(err, newAttendanceObj){
    console.log("new attend", newAttendanceObj)
    Grades.create({
      student: studentID,
      type: "grades",
      data: studentGrades,
      date: date
    }, function(err, newGradeObj){
      console.log("newGradeObj",newGradeObj)
      Data.create({
        student: studentID,
        type: "data",
        data: studentData,
        date: date
      }, function(err, newDataObj){
        console.log("newDataObj",newDataObj)
           Student.update({_id: studentID},{
             $push: { 'attendance' : newAttendanceObj._id ,'grades' : newGradeObj._id, 'data' : newDataObj._id }
           }, function(err, record){
             if(err){res.send(err)}
             Student.find({_id: studentID}, function(err, currentStudent){
              Student.find({}, function(err, allStudents){
                res.json({allStudents: allStudents, currentStudent: currentStudent})
              })
             })
           })
      })
    })
  })

  // Attendance.create({
  // 	student: studentID,
  // 	type: 'attendance',
  // 	data: studentAttendance,
  // 	date: date
  // }, function(err, newAttendance){
  // 	  	if(err){res.send(err)}
  // 	  	attendID = newAttendance._id;
  // 	  	console.log('new attendance logged')
  // })

  //  Data.create({
  // 	student: studentID,
  // 	type: 'data',
  // 	data: studentData,
  // 	date: date
  // }, function(err, newData){
  // 	  	if(err){res.send(err)}
  // 	  	dataID = newData._id;
  // 	  	console.log('new data logged')

  // })

  //  Grades.create({
  // 	student: studentID,
  // 	type: 'data',
  // 	data: studentGrades,
  // 	date: date
  // }, function(err, newGrade){
  // 	  	if(err){res.send(err)}
  // 	  	gradeID = newGrade._id;
  // 	  	console.log('new grade logged')

  // })

   // Student.update({_id: studentID},{
   // 	$addToSet: {attendance: attendID},
   // 	$addToSet: {grades: gradeID},
   // 	$addToSet: {data: dataID}
   // }, function(err, record){
   // 	if(err){res.send(err)}
   // })

   // Student.update({_id: studentID},{
   //  attendance: attendID,
   //  grades: gradeID,
   //  data: dataID
   // }, function(err, record){
   //  if(err){res.send(err)}
   //    console.log(attendID, "attendID")
   //    console.log("Student updates")
   //       Student.find({}, function(err, allStudents){
   //  console.log(allStudents, "allStudents")
   //  res.json(allStudents);
   // })
   // })

}




routes.GETarchive = function(req, res, next) {
  Student.find({archived: true}, function(err, archivedStudents){
  	res.json(archivedStudents);
  })
}

module.exports = routes;