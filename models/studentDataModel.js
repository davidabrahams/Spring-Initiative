var mongoose = require('mongoose');

var attendanceSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: Boolean,
	student: String
});

var dataSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: String,
	student: String
});

var studentSchema = mongoose.Schema({
	name: String,
	program: String,
	attendance: [String],
	grades: [String],
	data: [String],
	archived: Boolean
});

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

module.exports.attendance = mongoose.model('Attendance', attendanceSchema);
module.exports.grades = mongoose.model('Grades', dataSchema);
module.exports.data = mongoose.model('Data', dataSchema);
module.exports.student = mongoose.model('Student', studentSchema);
module.exports.user = mongoose.model('User', userSchema);