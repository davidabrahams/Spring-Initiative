var express = require('express');
var path = require('path');
var routes = {};
var path = require('path');
var passport = require('passport');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME,
                                   process.env.SENDGRID_PASSWORD);

var User = require(path.join(__dirname, '../models/user'));
var Attendance = require(path.join(__dirname, '../models/data')).attendance;
var Entry = require(path.join(__dirname, '../models/data')).entry;
var Student = require(path.join(__dirname, '../models/student'));
var Grades = require(path.join(__dirname, '../models/data')).grades;

routes.GETallStudents = function(req, res) {
  Student.find({}, function(err, allStudents) {
    res.json(allStudents);
  });
}

routes.POSTlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)
      return res.status(500).send(err.message);
    if (!user)
      return res.status(401).send(info.message);
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.sendStatus(200);
    });
  })(req, res, next);
}

routes.POSTlogout = function(req, res){
  console.log("logged out")
  req.logout();
  res.sendStatus(200);
}

routes.POSTregister = function(req, res, next) {
  User.register(new User({
      email: req.body.username
    }), req.body.password,
    function(err, user) {
      if (err) {
        return res.status(403).send(err.message);
      }

      // Get admin emails
      User.find({isAdmin: true}, {email: 1, _id: 0}, function(err, admins) {
        // send email verification to admins
        var half = user.authToken.length / 2;
        var firstHalfAuth = user.authToken.slice(0, half);
        var secondHalfAuth = user.authToken.slice(half);
        var authenticationURL = 'http://' + req.headers.host +
          '/verify?authTokenAdmin=' + firstHalfAuth + 
          '&email=' + user.email;
        var email = new sendgrid.Email();

        for (var i = admins.length - 1; i >= 0; i--) {
          email.addTo(admins[i].email);
        };

        email.setFrom('SpringInitiative@olinjs.com');
        email.setSubject(user.email + ' wants to register for Spring Initiative\'s website.');
        email.setHtml('<a target=_blank href=\"' + authenticationURL +
          '\">Confirm their registration.</a>' + 
          '<br>This is an automated response. Do not reply.');
        sendgrid.send(email);

        // send email verification to user
        authenticationURL = 'http://' + req.headers.host +
          '/verify?authTokenUser=' + secondHalfAuth + 
          '&email=' + user.email;
        var email2 = new sendgrid.Email();
        email2.addTo(user.email);
        email2.setFrom('SpringInitiative@olinjs.com');
        email2.setSubject('Register for Spring Initiative\'s website.');
        email2.setHtml('<a target=_blank href=\"' + authenticationURL +
          '\">Confirm your registration.</a>' + 
          '<br>This is an automated response. Do not reply.');
        sendgrid.send(email2);

        console.log("Email verification sent");
        res.sendStatus(200);
      });

    });
}

routes.GETemailver = function(req, res) {
  User.find({email: req.query.email}, function (err, user){
    // fill in model with authTokens
    if(req.query.authTokenAdmin !== undefined){
      user.adminAuth = req.query.authTokenAdmin;
      User.findOneAndUpdate({email: req.query.email}, user, function(err){
        console.log('Update error:', err);
      });
    } else if(req.query.authTokenUser !== undefined) {
      user.userAuth = req.query.authTokenUser;
      User.findOneAndUpdate({email: req.query.email}, user, function(err){
        console.log('Update error:', err);
      });
    }

    console.log('\nUser now:', user.adminAuth, user.userAuth, '\n');

    // if both halves of authToken are present
    if(user.adminAuth !== undefined && user.userAuth !== undefined){
      var authToken = user.adminAuth + user.userAuth;
      User.verifyEmail(authToken, function(err, existingAuthToken) {
        if (err) {
          console.log('Email ver err:', err);
          res.sendStatus(500);
        }
        else {
          var email = new sendgrid.Email();
          email.addTo(req.query.email);
          email.addTo('nora.mohamed@students.olin.edu'); //
          email.setFrom('SpringInitiative@olinjs.com');
          email.setSubject('Registration complete for Spring Initiative');
          email.setHtml('You\'ve been registered for Spring Initiative\'s website.' +
                        '<br>This is an automated response. Do not reply.');
          sendgrid.send(email);

          console.log("Email alert sent");
          res.redirect('/login');
        }
      });
    }
    res.redirect('/login');
  });
}

routes.GETstudent = function(req, res, next) {
  Student.findOne({
    _id: req.params._id
  }, function(err, currentStudent) {
    if (err) {
      res.send(err)
    }
    Student.find({}, function(err, allStudents) {
      if (err) {
        res.send(err)
      }
      res.json({
        currentStudent: currentStudent,
        allStudents: allStudents
      });
    })
  })
}

routes.POSTeditstudent = function(req, res, next) {

  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;
  var studentID = req.params._id;
  console.log("student attr", studentName, studentProgram, studentArchived)

  Student.update({
    _id: studentID
  }, {
    name: studentName,
    program: studentProgram,
    archived: studentArchived
  }, function(err, record) {
    Student.find({}, function(err, allStudents) {
      if (err) {
        res.send(err)
      }
      Student.findOne({_id: studentID}, function(err, currentStudent) {
        res.json({allStudents:allStudents, currentStudent: currentStudent})
      })
    })
  })
}

routes.POSTaddstudent = function(req, res, next) {
  var studentName = req.body.name;
  var studentProgram = req.body.program;
  var studentArchived = req.body.archived;

  Student.create({
    name: studentName,
    program: studentProgram,
    archived: studentArchived
  }, function(err, newStudent) {
    if (err) {
      res.send(err)
    }
    Student.find({}, function(err, allStudents) {
      res.json({
        allStudents: allStudents,
        newStudent: newStudent
      });
    })
  })
}

routes.POSTnewEntry = function(req, res, next) {
  // var currentDate = new Date();
  var studentID = req.params._id;
  var studentAttendance = req.body.attendance;
  var studentEntry = req.body.entry;
  var studentGrades = req.body.grades;
  var date = req.body.date;
  console.log("formdata", studentID, studentAttendance, studentGrades,
    studentEntry, date)

  Attendance.create({
    student: studentID,
    type: "attendance",
    entry: studentAttendance,
    date: date,
    submitted: new Date()
  }, function(err, newAttendanceObj) {
    console.log("new attend", newAttendanceObj)
    Grades.create({
      student: studentID,
      type: "grades",
      entry: studentGrades,
      date: date,
      submitted: new Date()
    }, function(err, newGradeObj) {
      console.log("newGradeObj", newGradeObj)
      Entry.create({
        student: studentID,
        type: "entry",
        entry: studentEntry,
        date: date,
        submitted: new Date()
      }, function(err, newEntryObj) {
        console.log("newEntryObj", newEntryObj)
        Student.update({
          _id: studentID
        }, {
          $push: {
            'attendance': newAttendanceObj._id,
            'grades': newGradeObj._id,
            'entry': newEntryObj._id
          }
        }, function(err, record) {
          if (err) {
            res.send(err)
          }
          Student.find({
            _id: studentID
          }, function(err, currentStudent) {
            Student.find({}, function(err, allStudents) {
              res.json({
                allStudents: allStudents,
                currentStudent: currentStudent
              })
            })
          })
        })
      })
    })
  })

}

routes.GETarchive = function(req, res, next) {
  Student.find({
    archived: true
  }, function(err, archivedStudents) {
    res.json(archivedStudents);
  })
}

routes.GETallUsers = function(req, res) {
  User.find({}, function(err, allUsers) {
    res.json(allUsers);
  })
}

routes.POSTchangeAdmin = function(req, res) {
  userid = req.params._id;
  User.findOne({_id:userid}, function (err, user) {
    user.isAdmin = !user.isAdmin;
    user.save(function (err) {
      if(err) {
        console.log(err);
      }
    })
    res.json(user);
  });
}

module.exports = routes;
