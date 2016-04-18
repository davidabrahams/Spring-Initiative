var path = require('path');
var routes = {};

var userRoutes = require(path.join(__dirname, './userRoutes'));
var studentRoutes = require(path.join(__dirname, './studentRoutes'));
var entryRoutes = require(path.join(__dirname, './entryRoutes'));
var cohortRoutes = require(path.join(__dirname, './cohortRoutes'));

routes.GETallStudents = studentRoutes.GETallStudents;
routes.GETstudent = studentRoutes.GETstudent;
routes.POSTeditstudent = studentRoutes.POSTeditstudent;
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

routes.POSTnewEntry = entryRoutes.POSTnewEntry;
routes.GETstudentEntriesList = entryRoutes.GETstudentEntriesList;
routes.GETstudentEntries = entryRoutes.GETstudentEntries;

routes.POSTnewCohortEntry = cohortRoutes.POSTnewCohortEntry;

module.exports = routes;
