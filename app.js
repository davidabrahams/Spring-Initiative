var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

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
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
     res.sendFile('index.html', { root: path.join(__dirname, './views') });
    })

app.get('/student', function(req, res){
    res.sendFile('student.html', { root: path.join(__dirname, './views') });
    })

app.get('/', index.GEThome);
app.post('/login', index.POSTlogin);
app.post('/register', index.POSTregister);
app.get('/api/index', index.GETindex);
app.get('/program', index.GETprogram);
app.get('/api/student/:_id', index.GETstudent);
app.post('/api/student/add', index.POSTaddstudent);
app.post('/api/student/edit/:_id', index.POSTeditstudent);
app.get('/api/index/archive', index.GETarchive);
app.post('api/student/newEntry/:_id', index.POSTnewEntry);

var mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connection successful!');
});

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


module.exports = app;