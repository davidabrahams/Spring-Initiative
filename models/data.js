var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
  type: String,
  date: Date,
  data: Array
});


module.exports.attendace = mongoose.model('Attendace', dataSchema);
module.exports.grades = mongoose.model('Grades', dataSchema);
// TODO: data is a reserved word, we should refactor this
module.exports.data = mongoose.model('Data', dataSchema);
