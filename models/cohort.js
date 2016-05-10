var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  // how do you know what students are in the cohort?
  name: String,
  comment: String,
  actionSteps: String,
  date: Date
});

module.exports = mongoose.model('Cohort', cohortSchema);
