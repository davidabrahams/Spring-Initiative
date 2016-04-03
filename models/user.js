var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-local-mongoose-email');

var User = new Schema({
	isAdmin: {type: Boolean, default: false}
});

// Passport Email used here
User.plugin(passportEmail, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', User);
