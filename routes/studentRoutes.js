/*ROUTES: Routes related to students
This file contains routes for geting all student data, getting data for an individual student,
editing a student's information, deleting a student, adding a student, and viewing archived students*/

var path = require('path');
var routes = {};
var Student = require(path.join(__dirname, '../models/student'));

routes.GETallStudents = function(req, res) {
  Student.find({}, function(err, allStudents) {
    res.json({allStudents:allStudents});
  });
};

routes.GETstudent = function(req, res, next) {
  Student.findOne({
    _id: req.params._id
  }, function(err, currentStudent) {
    if (err) res.send(err);
    Student.find({}, function(err, allStudents) {
      if (err) res.send(err);
      res.json({
        currentStudent: currentStudent,
        allStudents: allStudents
      });
    });
  });
};

routes.POSTeditstudent = function(req, res, next) {
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;
  var studentID = req.params._id;
  var studentOverview = req.body.overview;
  var studentActionSteps = req.body.actionSteps;

  Student.update({
    _id: studentID
  }, {
    name: studentName,
    program: studentProgram,
    archived: studentArchived,
    overview: studentOverview,
    actionSteps: studentActionSteps
  }, function(err, record) {
    Student.find({}, function(err, allStudents) {
      if (err) {
        return res.status(500).json({msg: 'Error editing student data'});
      }
      Student.findOne({_id: studentID}, function(err, currentStudent) {
        res.json({allStudents:allStudents, currentStudent: currentStudent, msg: 'Student data edited successfully!'});
      });
    });
  });

};

routes.DELETEstudent = function(req, res, next) {
  var studentID = req.params._id;
  Student.findByIdAndRemove(studentID, function(error, doc, result) {
    if (error) {
      return res.status(500).json({msg: 'Error deleting student'});
    }
    Student.find({}, function(err, allStudents) {
      res.json(allStudents);
    });
  });
};

routes.POSTaddstudent = function(req, res, next) {
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;

  Student.create({
    name: studentName,
    program: studentProgram,
    archived: studentArchived
  }, function(err, newStudent) {
    if (err) {
      res.send(err);
      return res.status(500).json({msg: 'Error adding student'});
    }
    Student.find({}, function(err, allStudents) {
      res.json({
        allStudents: allStudents,
        newStudent: newStudent,
        msg: 'Student added successfully!',
      });
    });
  });
};

routes.GETarchive = function(req, res, next) {
  Student.find({
    archived: true
  }, function(err, archivedStudents) {
    res.json(archivedStudents);
  });
};

module.exports = routes;
