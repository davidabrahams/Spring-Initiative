var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  program: String,
  archived: Boolean,
  overview: String,
  warnings: String,
  stars: Number,
  reading: Number
});

module.exports = mongoose.model('Student', studentSchema);
