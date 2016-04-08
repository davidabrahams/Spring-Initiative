var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  program: String,
  comment: String
});

module.exports = mongoose.model('Cohort', cohortSchema);
