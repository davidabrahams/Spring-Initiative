var routes = {};
var path = require('path');
var Cohort = require(path.join(__dirname, '../models/cohort'));

routes.POSTnewCohortEntry = function(req, res, next) {
  var cohortComment = req.body.comment;
  var actionSteps = req.body.actionSteps;
  var date = req.body.date;
  var cohortName =req.body.cohortName;

  Cohort.create({
    name: cohortName,
    comment: cohortComment,
    actionSteps: actionSteps,
    date: date,
  }, function(err, newCohortEntryObj) {
    if (err) return res.status(500).json({msg: 'Error submitting entry'});
    res.json({newCohortEntryObj:newCohortEntryObj, msg: 'Entry submitted successfully!'});  
  });
};

module.exports = routes;