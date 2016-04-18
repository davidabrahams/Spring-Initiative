var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  name: String,
  comment: String,
  actionSteps: String
});

module.exports = mongoose.model('Cohort', cohortSchema);
