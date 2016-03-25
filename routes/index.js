var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res){
	//POST login
	res.sendfile('./views/index.html');
});

router.post('/register', function(req, res){
	//POST register
	res.sendfile('./views/index.html');
});

router.get('/index', function(req, res){
	//GET index
	res.sendfile('./views/index.html');

});

router.get('/program', function(req, res){
	//GET program
	res.sendfile('./views/index.html');
});

router.get('/student', function(req, res){
	//GET student
	res.sendfile('./views/index.html');

});

router.post('/student/add', function(req, res){
	//Add new student
	res.sendfile('./views/index.html');
});

router.post('/student/edit', function(req, res){
	//Edit existing student
	res.sendfile('./views/index.html');
});

router.get('/student/archive', function(req,res){
	//GET archived students
	res.sendfile('./views/index.html');
});

module.exports = router;
