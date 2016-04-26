var path = require('path');
var routes = {};
var Student = require(path.join(__dirname, '../models/student'));

routes.GETallStudents = function(req, res) {
  Student.find({}, function(err, allStudents) {
    Student.find({program: "Baby Spring"}, function(err, babySpringStudents){
      Student.find({program: "Junior Spring"}, function(err, juniorSpringStudents){
        Student.find({program: "Little Spring"}, function(err, littleSpringStudents){
          Student.find({program: "Big Spring"}, function(err, bigSpringStudents){
            res.json({allStudents:allStudents, juniorSpring:juniorSpringStudents, bigSpring:bigSpringStudents, littleSpring: littleSpringStudents, babySpring: babySpringStudents});
          })
        })
      })
    })
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
  var studentOverview = req.body.overview;

  Student.update({
    _id: studentID
  }, {
    name: studentName,
    program: studentProgram,
    archived: studentArchived,
    overview: studentOverview
  }, function(err, record) {
    Student.find({}, function(err, allStudents) {
      if (err) {
        res.send(err)
        return res.status(200).json({msg: 'Error editing student data'});
      }
      Student.findOne({_id: studentID}, function(err, currentStudent) {
        res.json({allStudents:allStudents, currentStudent: currentStudent, msg: 'Student data edited successfully!'})
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
      return res.status(500).json({msg: 'Error adding student'});
    }
    Student.find({}, function(err, allStudents) {
      res.json({
        allStudents: allStudents,
        newStudent: newStudent,
        msg: 'Student added successfully!',

      });
    })
  });
}

routes.GETarchive = function(req, res, next) {
  Student.find({
    archived: true
  }, function(err, archivedStudents) {
    res.json(archivedStudents);
  })
}

module.exports = routes;
