var path = require('path');
var routes = {};

var FormDB = require(path.join(__dirname, '../models/form'));

routes.POSTnewEntry = function(req, res, next) {
  
  var studentID = req.params._id;
  var date = req.body.date.slice(0,10);
  var currentDate = Date.parse(date);
  var period = req.body.period;
  var attendance = req.body.attendance;
  var behaviorText = req.body.behaviorText;
  var actionSteps = req.body.actionSteps;
  var schoolBehavior= req.body.schoolBehavior;
  var readingLevels = req.body.readingLevels;
  var teacherFeedback = req.body.teacherFeedback;
  var warnings = req.body.warnings;
  var stars = req.body.stars;
  FormDB.create({
    _studentID: studentID,
    date: currentDate,
    period: period,
    attendance: attendance,
    behaviorText: behaviorText,
    warnings: warnings,
    stars: stars,
    schoolBehavior: schoolBehavior,
    actionSteps: actionSteps,
    readingLevels: readingLevels,
    teacherFeedback: teacherFeedback
  }, function(err, newEntryObj) {
    if (err) {
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
  var behaviorList = [];
  var warningList = [];

  FormDB.find({_studentID:studentID}, function(err, studentData){
    for (var i = 0; i < studentData.length; i++){
      attendanceList.push(studentData[i].attendance);
      starsList.push(studentData[i].stars);
      datesList.push(studentData[i].date);
      behaviorList.push(studentData[i].schoolBehavior);
      warningList.push(studentData[i].warnings);
    }
    console.log(behaviorList, 'behaviorList')
    res.json({attendanceList: attendanceList, starsList: starsList, datesList:datesList, warningList:warningList});
  })
}

module.exports = routes;
