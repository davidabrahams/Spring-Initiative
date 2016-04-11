var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formSchema = Schema({
  _studentID: String,
  period: String,
  date: Date,
  attendance: String,
  behaviorText: String,
  warnings: String,
  stars: String,
  engagingContent: Number,
  engagingPeers: Number,
  schoolBehavior: [Boolean],
  actionSteps: String,
  grades: String,
  readingLevels: String,
  teacherFeedback: String
});

module.exports = mongoose.model('Form', formSchema);
