var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	name: String,
	program: String,
	attendance: [String],
	grades: [String],
	entry: [String],
	archived: Boolean
});

module.exports = mongoose.model('Student', studentSchema);
