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
  })
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

      // send email verification
      // Used example: https://github.com/heitortsergent/passport-local-mongoose-email/tree/master/examples/login
      // req.headers.host gets the current host url
      var authenticationURL = 'http://' + req.headers.host +
        '/verify?authToken=' + user.authToken;
      var email = new sendgrid.Email();

      email.addTo(user.email);
      email.setFrom('SpringInitiative@olinjs.com');
      email.setSubject('Confirm your email for Spring Initiative');
      email.setHtml('<a target=_blank href=\"' + authenticationURL +
        '\">Confirm \
                  your email</a><br>This is an automated response. Do not reply'
      );
      sendgrid.send(email);

      console.log("Email Sent");
      res.sendStatus(200);
    });
}

routes.GETemailver = function(req, res) {
  // User gets here after clicking the link in the email
  // Hence needs to be redirected
  User.verifyEmail(req.query.authToken, function(err, existingAuthToken) {
    if (err) console.log('err:', err);

    res.redirect('/')
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
    date: date
  }, function(err, newAttendanceObj) {
    console.log("new attend", newAttendanceObj)
    Grades.create({
      student: studentID,
      type: "grades",
      entry: studentGrades,
      date: date
    }, function(err, newGradeObj) {
      console.log("newGradeObj", newGradeObj)
      Entry.create({
        student: studentID,
        type: "entry",
        entry: studentEntry,
        date: date
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
