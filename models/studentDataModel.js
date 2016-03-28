var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: Array,
	student: String
});

var studentSchema = mongoose.Schema({
	name: String,
	program: String,
	attendance: Array,
	grades: Array,
	data: Array,
	archived: Boolean
});

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

module.exports.attendace = mongoose.model('Attendace', dataSchema);
module.exports.grades = mongoose.model('Grades', dataSchema);
module.exports.data = mongoose.model('Data', dataSchema);
module.exports.student = mongoose.model('Student', studentSchema);
module.exports.user = mongoose.model('User', userSchema);