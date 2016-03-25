var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res){
	//POST login
	res.sendfile('./public/index.html');
});

router.post('/register', function(req, res){
	//POST register
	res.sendfile('./public/index.html');
});

router.get('/index', function(req, res){
	//GET index
	res.sendfile('./public/index.html');

});

router.get('/program', function(req, res){
	//GET program
	res.sendfile('./public/index.html');
});

router.get('/student', function(req, res){
	//GET student
	res.sendfile('./public/index.html');

});

router.get('/student/add', function(req, res){
	//Add new student
	res.sendfile('./public/index.html');
});

router.get('/student/edit', function(req, res){
	//Edit existing student
	res.sendfile('./public/index.html');
});

router.get('/student/archive', function(req,res){
	//GET archived students
	res.sendfile('./public/index.html');
});

module.exports = router;
