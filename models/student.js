var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  _cohortID: { type: Number, ref: 'Cohort' },
  archived: Boolean
});

module.exports = mongoose.model('Student', studentSchema);
