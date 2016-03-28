​var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	type: String,
	date: Date,
	data: Array
});  
​
var studentSchema = mongoose.Schema({
	id: Number,
	name: String,
	program: String,
	attendance: [{type: Schema.ObjectId, ref: 'Attendance'}],
	grades: [{type: Schema.ObjectId, ref: 'Grades'}],
	data: [{type: Schema.ObjectId, ref: 'Data'}],
	archived: Boolean
});

var userSchema = mongoose.Schema({
	username: String,
	password: String
});
​
module.exports.attendance = mongoose.model('Attendance', dataSchema); 
module.exports.grades = mongoose.model('Grades', dataSchema); 
module.exports.data = mongoose.model('Data', dataSchema); 
module.exports.student = mongoose.model('Student', studentSchema);
// module.exports.user = mongoose.model('User', userSchema);

var User = mongoose.model('User', userSchema);

module.exports.user = User;