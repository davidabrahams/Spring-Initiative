var path = require('path');
var routes = {};

var userRoutes = require(path.join(__dirname, './userRoutes'));
var studentRoutes = require(path.join(__dirname, './studentRoutes'));
var entryRoutes = require(path.join(__dirname, './entryRoutes'));
var cohortRoutes = require(path.join(__dirname, './cohortRoutes'));
var overviewRoutes = require(path.join(__dirname, './overviewRoutes'));

routes.GEToverview = overviewRoutes.GEToverview;
routes.POSTeditOverview = overviewRoutes.POSTeditOverview;

routes.GETallStudents = studentRoutes.GETallStudents;
routes.GETstudent = studentRoutes.GETstudent;
routes.POSTeditstudent = studentRoutes.POSTeditstudent;
routes.DELETEstudent = studentRoutes.DELETEstudent;
routes.POSTaddstudent = studentRoutes.POSTaddstudent;
routes.GETarchive = studentRoutes.GETarchive;
routes.GETstudentEntries = studentRoutes.GETstudentEntries;

routes.POSTlogin = userRoutes.POSTlogin;
routes.POSTlogout = userRoutes.POSTlogout;
routes.POSTregister = userRoutes.POSTregister;
routes.GETemailver = userRoutes.GETemailver;
routes.GETallUsers = userRoutes.GETallUsers;
routes.POSTchangeAdmin = userRoutes.POSTchangeAdmin;
routes.POSTchangePassword = userRoutes.POSTchangePassword;
routes.DELETEdelUser = userRoutes.DELETEdelUser;

routes.GETstudentEntriesList = entryRoutes.GETstudentEntriesList;
routes.POSTnewDailyEntry = entryRoutes.POSTnewDailyEntry;
routes.POSTnewLongEntry = entryRoutes.POSTnewLongEntry;
routes.GETstudentEntries = entryRoutes.GETstudentEntries;
routes.GETallStudentEntries = entryRoutes.GETallStudentEntries;
routes.GETcohortEntries = entryRoutes.GETcohortEntries;

routes.POSTnewCohortEntry = cohortRoutes.POSTnewCohortEntry;

module.exports = routes;
