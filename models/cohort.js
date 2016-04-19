var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  name: String,
  comment: String,
  actionSteps: String,
  date: Date
});

module.exports = mongoose.model('Cohort', cohortSchema);
