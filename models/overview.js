var mongoose = require('mongoose');

var overviewSchema = mongoose.Schema({
  overview: String
});

module.exports = mongoose.model('Overview', overviewSchema);
