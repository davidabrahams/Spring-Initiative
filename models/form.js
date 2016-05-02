var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formSchema = Schema({
  _studentID: { type: Schema.Types.ObjectId, ref: 'Student' },
  period: String,
  date: Date,
  attendance: String,
  behaviorText: String,
  warnings: String,
  stars: Number,
  engageContent: Number,
  engagePeer: Number,
  engageAdult: Number,
  schoolBehavior: {'Write-Up': Boolean,
                    'Detention': Boolean,
                    'In-School Suspension': Boolean,
                    'Out-of-School Suspension': Boolean},
  grades: String,
  teacherFeedback: String,
  readingLevels: String,
  gradesSchool: String,
  teacherParentFeedback: String
});

module.exports = mongoose.model('Form', formSchema);
