var mongoose = require('mongoose');

//why does overview have it's own database object? What is it an overview of?
var overviewSchema = mongoose.Schema({
  overview: String
});

module.exports = mongoose.model('Overview', overviewSchema);
