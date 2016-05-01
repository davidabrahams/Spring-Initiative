var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  program: String,
  archived: Boolean,
  overview: String,
  actionSteps: String
});

module.exports = mongoose.model('Student', studentSchema);
