var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  program: String,
  archived: Boolean
});

module.exports = mongoose.model('Student', studentSchema);