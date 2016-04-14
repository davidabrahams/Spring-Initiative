var express = require('express');
var path = require('path');
var routes = {};

var FormDB = require(path.join(__dirname, '../models/form'));

routes.POSTnewEntry = function(req, res, next) {
  var studentID = req.params._id;
  var date = req.body.date;
  var period = req.body.period;
  var attendance = req.body.attendance;
  var behaviorText = req.body.behaviorText;
  var actionSteps = req.body.actionSteps;
  var readingLevels = req.body.readingLevels;
  var teacherFeedback = req.body.teacherFeedback;
  var warnings = req.body.warnings;
  var stars = req.body.stars;
  FormDB.create({
    _studentID: studentID,
    date: date,
    period: period,
    attendance: attendance,
    behaviorText: behaviorText,
    warnings: warnings,
    stars: stars,
    actionSteps: actionSteps,
    readingLevels: readingLevels,
    teacherFeedback: teacherFeedback
  }, function(err, newEntryObj) {
    if (err) {
      console.log(err)
      res.send(err)
      return res.status(500).json({msg: 'Error submitting entry'});
    }
    console.log("new form entry", newEntryObj)
    console.log(studentID, date, period, attendance, warnings, behaviorText, stars, warnings, actionSteps, teacherFeedback)

    res.json({newEntryObj:newEntryObj, msg: 'Entry submitted successfully!'});
  })
};

routes.GETstudentEntries = function(req, res){
  var studentID = req.params._id;
  var attendanceList = [];
  var starsList = [];
  var datesList = [];
  console.log(studentID)
  FormDB.find({_studentID:studentID}, function(err, studentData){
    console.log(studentData);
    for (var i = 0; i < studentData.length; i++){
      attendanceList.push(studentData[i].attendance);
      starsList.push(studentData[i].stars);
      datesList.push(studentData[i].date);
    }
    res.json({attendanceList: attendanceList, starsList: starsList, datesList:datesList});
  })
}

module.exports = routes;
