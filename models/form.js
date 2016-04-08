var mongoose = require('mongoose');

var formSchema = mongoose.Schema({
  _studentID: { type: String, ref: 'Student' },
  period: String,
  date: Date,
  attendance: String,
  behaviorText: String,
  warnings: String,
  stars: String,
  engagingContent: Number,
  engagingPeers: Number,
  schoolBehavior: String,
  actionSteps: String,
  grades: String,
  readingLevels: String,
  teacherFeedback: String
});



module.exports = mongoose.model('Form', formSchema);
