/* dataModel.js
*/
​
var mongoose = require('mongoose');   
​
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
	attendance: [{type: Schema.ObjectId, required: false, ref: 'attendance'}],
	grades: [{type: Schema.ObjectId, required: false, ref: 'grades'}],
	data: [{type: Schema.ObjectId, required: false, ref: 'data'}]
});
​
/*
{
	type: 'attendace'
	date: 'Jul 01 2016'
}
*/
​
module.exports.attendace = mongoose.model('attendace', dataSchema); 
module.exports.grades = mongoose.model('grades', dataSchema); 
module.exports.data = mongoose.model('data', dataSchema); 
module.exports.user = mongoose.model('student', studentSchema);