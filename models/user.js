var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportEmail = require('passport-local-mongoose-email'),
    passportLocal = require('passport-local-mongoose');

var User = new Schema({});

// TODO: use passport email to authenticate email addresses. This requires
// sending confirmation emails

// User.plugin(passportEmail, {
//   usernameField: 'email',
// });

User.plugin(passportLocal, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', User);
