var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');
// requires the model with Passport-Local plugged in
var User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

app.get('/verify', index.GETemailver);
app.get('/user', function(req, res, next) {
  res.json({user: req.user});
})
app.post('/api/login', index.POSTlogin);
app.post('/api/logout', index.POSTlogout);
app.post('/api/register', index.POSTregister);
app.get('/api/allStudents', index.GETallStudents);
app.get('/api/student/allEntries', index.GETallStudentEntries);
app.get('/api/student/:_id', index.GETstudent);
app.post('/api/student/add', index.POSTaddstudent);
app.post('/api/student/edit/:_id', index.POSTeditstudent);
app.get('/api/index/archive', index.GETarchive);
app.get('/api/student/dataList/:_id', index.GETstudentEntriesList);
app.get('/api/student/data/:_id/:dataType', index.GETstudentEntries);
app.post('/api/student/newDailyEntry/:_id', index.POSTnewDailyEntry);
app.post('/api/student/newLongEntry/:_id', index.POSTnewLongEntry);
app.get('/api/allUsers', index.GETallUsers);
app.post('/api/changeAdmin/:_id', index.POSTchangeAdmin);
app.post('/api/changePassword/:_id', index.POSTchangePassword);
app.post('/api/cohort/newCohortEntry/:name', index.POSTnewCohortEntry);
app.get('/api/cohort/data/:cohort', index.GETcohortEntries);
app.delete('/api/delUser/:_id', index.DELETEdelUser);
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile('main.html', { root: path.join(__dirname, 'views') });
});

var mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection successful!');
});

// use static authenticate method of model in LocalStrategy
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't send an error
  res.sendStatus(401);
}

module.exports = app;
