var mongoose = require('mongoose');

var formSchema = mongoose.Schema({
  _studentID: { type: Number, ref: 'Student' },
  period: String,
  date: Date,
  attendance: String,
  behaviorText: String,
  warnings: String,
  stars: Number,
  engagingContent: Number,
  engagingPeers: Number,
  schoolBehavior: String,
  actionSteps: String,
  grades: [String],
  readingLevels: [Number],
  teacherFeedback: String
});



module.exports.attendance = mongoose.model('Form', formSchema);
