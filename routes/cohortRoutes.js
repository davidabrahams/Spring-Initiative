var routes = {};
var path = require('path');
var Cohort = require(path.join(__dirname, '../models/cohort'));



routes.GETcohort = function(req, res, next){
  Cohort.find({}, function(err, allCohorts) {
    if (err) {
      res.send(err)
    }
    res.json({
      allCohorts: allCohorts       
    });
  });
}


routes.POSTnewCohortEntry = function(req, res, next) {
  var cohortName = req.body.name;
  var cohortComment = req.body.comment;

  Cohort.create({
    name: cohortName,
    comment: cohortComment
  }, function(err, newCohortEntryObj) {
    if (err) {
      res.send(err)
    }
    console.log("new cohort entry", newCohortEntryObj)
    res.json(newCohortEntryObj)
  })
};

module.exports = routes;
