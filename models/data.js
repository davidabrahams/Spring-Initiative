var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
  type: String,
  date: Date,
  entry: Boolean,
  student: String,
  submitted: Date
});

var entrySchema = mongoose.Schema({
  type: String,
  date: Date,
  entry: String,
  student: String,
  submitted: Date
});


module.exports.attendance = mongoose.model('Attendance', attendanceSchema);
module.exports.grades = mongoose.model('Grades', entrySchema);
module.exports.entry = mongoose.model('Entry', entrySchema);
