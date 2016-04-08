var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  _cohortID: String,
  archived: Boolean
});

module.exports = mongoose.model('Student', studentSchema);
