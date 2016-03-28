var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  id: Number,
  name: String,
  program: String,
  attendance: Array,
  grades: Array,
  data: Array,
  archived: Boolean
});

module.exports = mongoose.model('Student', studentSchema);
