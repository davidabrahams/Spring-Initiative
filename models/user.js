var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-local-mongoose-email');

var User = new Schema({});

User.plugin(passportEmail, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', User);
