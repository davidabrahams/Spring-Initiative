var mongoose = require('mongoose');

var cohortSchema = mongoose.Schema({
  name: String,
  comment: String
});

module.exports = mongoose.model('Cohort', cohortSchema);
