var express = require('express');
var path = require('path');
var routes = {};
var path = require('path');
var passport = require('passport');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME,
                                   process.env.SENDGRID_PASSWORD);

var User = require(path.join(__dirname, '../models/user'));
var FormDB = require(path.join(__dirname, '../models/form'));
var Cohort = require(path.join(__dirname, '../models/cohort'));
var Student = require(path.join(__dirname, '../models/student'));

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
  });
}

routes.POSTnewEntry = function(req, res, next) {
  var studentID = req.params._id;
  var date = req.body.date;
  var period = req.body.period;
  var attendance = req.body.attendance;
  var behaviorText = req.body.behaviorText;
  var actionSteps = req.body.actionSteps;
  var readingLevels = req.body.readingLevels;
  var teacherFeedback = req.body.teacherFeedback;
  var warnings = req.body.warnings;
  var stars = req.body.stars;
  FormDB.create({
    _studentID: studentID,
    date: date,
    period: period,
    attendance: attendance,
    behaviorText: behaviorText,
    warnings: warnings,
    stars: stars,
    actionSteps: actionSteps,
    readingLevels: readingLevels,
    teacherFeedback: teacherFeedback
  }, function(err, newEntryObj) {
    if (err) {
      console.log(err)
      res.send(err)
    }
    console.log("new form entry", newEntryObj)
    console.log(studentID, date, period, attendance, warnings, behaviorText, stars, warnings, actionSteps, teacherFeedback)

    res.json(newEntryObj)
  })
};


routes.POSTnewCohortEntry = function(req, res, next) {
  var cohortName = req.body.name;
  var cohortComment = req.body.comment;

  Cohort.create({
    name: cohortName,
    comment: cohortComment
  }, function(err, newCohortEntryObj) {
    if (err) {
      res.send(err)
    }
    console.log("new cohort entry", newCohortEntryObj)
    res.json(newCohortEntryObj)
  })
};

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

routes.POSTchangePassword = function(req, res) {
  userid = req.params._id;
  User.findOne({_id:userid}, function (err, user) {
    /////VHANGE
    user.save(function (err) {
      if(err) {
        console.log(err);
      }
    })
    res.json(user);
  });
}

module.exports = routes;
