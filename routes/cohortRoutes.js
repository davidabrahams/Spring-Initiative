var routes = {};
var path = require('path');
var Cohort = require(path.join(__dirname, '../models/cohort'));




routes.POSTnewCohortEntry = function(req, res, next) {

  console.log('Posting New Cohort Entry')
  //var cohortName = req.body.name;
  var cohortComment = req.body.comment;
  var actionSteps = req.body.actionSteps;

  Cohort.create({
    name: 'Little Spring',
    comment: cohortComment,
    actionSteps: actionSteps
  }, function(err, newCohortEntryObj) {
    if (err) {
       return res.status(500).json({msg: 'Error submitting entry'});
    }
    console.log("new cohort entry", newCohortEntryObj)
    res.json({newCohortEntryObj:newCohortEntryObj, msg: 'Entry submitted successfully!'});  
    
  })
};

module.exports = routes;


