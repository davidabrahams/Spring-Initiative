var path = require('path');
var routes = {};

var FormDB = require(path.join(__dirname, '../models/form'));
var Student = require(path.join(__dirname, '../models/student'));

routes.POSTnewDailyEntry = function(req, res, next) {
  // This route only handles short term
  var studentID = req.params._id;
  var period = 'Daily';
  var date = req.body.date;
  var currentDate = Date.parse(date);
  var attendance = req.body.attendance;
  var behaviorText = req.body.behaviorText;
  var actionSteps = req.body.actionSteps;
  var schoolBehavior= req.body.schoolBehavior;
  var teacherFeedback = req.body.teacherFeedback;
  var warnings = req.body.warnings;
  var stars = req.body.stars;
  var engageContent = parseInt(req.body.engageContent);
  var engagePeer = parseInt(req.body.engagePeer);
  var engageAdult = parseInt(req.body.engageAdult);
  var querry = {
    _studentID: studentID,
    date: currentDate,
    period: period,
    attendance: attendance,
    behaviorText: behaviorText,
    actionSteps: actionSteps,
    schoolBehavior: schoolBehavior,
    teacherFeedback: teacherFeedback,
    warnings: warnings,
    stars: stars,
    engageContent: engageContent,
    engagePeer: engagePeer,
    engageAdult:engageAdult
  }
  var callback = function(err, newEntryObj) {
    if (err) {
      return res.status(500).json({msg: 'Error submitting entry'});
    }
    res.json({newEntryObj:newEntryObj, msg: 'Entry submitted successfully!'});
  };
  if (req.body._id == null) {
    FormDB.create(querry, callback)
  } else {
    FormDB.findByIdAndUpdate(req.body._id, {$set: querry}, {new: true}, callback);
  }
};

routes.POSTnewLongEntry = function(req, res, next) {
  // This route only handles long term
  var studentID = req.params._id;
  var period = 'Long Term';
  var date = req.body.date.slice(0,10);
  var currentDate = Date.parse(date);
  var gradesSchool = req.body.grades;
  var timeLength = req.body.timeLength;
  var readingLevels= req.body.readingLevels;
  var parentTeachFeedback = req.body.parentTeachFeedback;
  FormDB.create({
    _studentID: studentID,
    date: currentDate,
    period: period,
    gradesSchool: gradesSchool,
    timeLength: timeLength,
    readingLevels: readingLevels,
    parentTeachFeedback: parentTeachFeedback
  }, function(err, newEntryObj) {
    if (err) {
      return res.status(500).json({msg: 'Error submitting entry'});
    }
    res.json({newEntryObj:newEntryObj, msg: 'Entry submitted successfully!'});
  });
};

routes.GETallStudentEntries = function(req, res) {
  var studentID = req.query.studentID;
  FormDB.find({_studentID:studentID}, function(err, entries) {
    if (err)
      res.sendStatus(500);
    res.json(entries);
  });

}

routes.GETstudentEntriesList = function(req, res) {
  var studentID = req.params._id;
  var attendanceList = [];
  var starsList = [];
  var datesList = [];
  var behaviorList = [];
  var warningList = [];
  var engageContentList = []

  FormDB.find({_studentID:studentID}, function(err, studentData) {
    for (var i = 0; i < studentData.length; i++){
      attendanceList.push(studentData[i].attendance);
      starsList.push(studentData[i].stars);
      datesList.push(studentData[i].date);
      behaviorList.push(studentData[i].schoolBehavior);
      warningList.push(studentData[i].warnings);
      engageContentList.push(studentData[i].engageContent)
    }
    res.json({attendanceList: attendanceList, starsList: starsList, datesList:datesList, warningList:warningList, engageContentList: engageContentList});
  });
}

routes.GETstudentEntries = function(req, res){
  var studentID = req.params._id;
  var dataType = req.params.dataType; // i.e., daily, weekly, monthly, etc
  console.log(studentID, dataType);
  FormDB.find({_studentID:studentID, period: dataType}, function(err, studentData){
    studentData.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    res.json(studentData);
  });
}

routes.GETcohortEntries = function(req, res) {
  var cohort = req.params.cohort;
  var studentListFull = [];
  var attendanceList = [];
  var starsList = [];
  var datesList = [];
  var behaviorList = [];
  var warningList = [];
  var engageContentList = []

  Student.find({program:cohort}, function(err, students){
    var studentIds = students.map(function(student){return student._id});
    console.log('studentIds: '+studentIds);
    FormDB.find({_studentID:{$in:studentIds}}, function(err, forms) {
      forms.forEach(function(form) {
        attendanceList.push(form.attendance);
        starsList.push(form.stars);
        datesList.push(form.date);
        warningList.push(form.warnings);
        engageContentList.push(form.engageContent)
      });
      res.json({attendanceList: attendanceList, starsList: starsList, datesList:datesList, warningList:warningList, engageContentList: engageContentList});
    })
  })
}


module.exports = routes;
