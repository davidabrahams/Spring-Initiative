var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  // is this how you know which cohort they are in?
  program: String,
  archived: Boolean,
  //should probably be a ref to overview
  overview: String,
  actionSteps: String
});

module.exports = mongoose.model('Student', studentSchema);
