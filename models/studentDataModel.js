var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: Array
});

var studentSchema = mongoose.Schema({
	id: Number,
	name: String,
	program: String,
	attendance: Array,
	grades: Array,
	data: Array,
	archived: Boolean
});

module.exports.attendace = mongoose.model('Attendace', dataSchema);
module.exports.grades = mongoose.model('Grades', dataSchema);
module.exports.data = mongoose.model('Data', dataSchema);
module.exports.student = mongoose.model('Student', studentSchema);
