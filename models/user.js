var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-local-mongoose-email'),
    passportLocal = require('passport-local-mongoose');

var User = new Schema({});


User.plugin(passportEmail, {
  usernameField: 'email',
});

// Might not need this
// User.plugin(passportLocal, {
//   usernameField: 'email',
// })

module.exports = mongoose.model('User', User);
