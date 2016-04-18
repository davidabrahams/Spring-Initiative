var routes = {};
var path = require('path');
var Cohort = require(path.join(__dirname, '../models/cohort'));




routes.POSTnewCohortEntry = function(req, res, next) {
  //var cohortName = req.body.name;
  var cohortComment = req.body.comment;
  var actionSteps = req.body.actionSteps;

  Cohort.create({
    name: 'Little Spring',
    comment: cohortComment,
    actionSteps: actionSteps
  }, function(err, newCohortEntryObj) {
    if (err) {
      res.send(err)
    }
    console.log("new cohort entry", newCohortEntryObj)
    res.json(newCohortEntryObj)
  })
};

module.exports = routes;
