var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-email');

var User = new Schema({});

User.plugin(passportEmail);

module.exports = mongoose.model('User', User);
