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
  schoolBehavior: {'Write-Up': Boolean, 
                    'Detention': Boolean,
                    'In-School Suspension': Boolean,
                    'Out-of-School Suspension': Boolean},
  actionSteps: String,
  teacherFeedback: String,
  readingLevels: String,
  timeLength: String,
  gradesSchool: String,
  parentTeachFeedback: String
});

module.exports = mongoose.model('Form', formSchema);
