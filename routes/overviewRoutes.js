var routes = {};
var path = require('path');
var Overview = require(path.join(__dirname, '../models/overview'));

routes.GEToverview = function(req, res) {
  Overview.find({}, function(err, data) {
    // If no data exists:
    if (data[0] == undefined) {
      Overview.create({
        overview: 'Welcome to Spring Initiative\'s student management system!'
      }, function(err, newData) {
        console.log('Initializing overview data.');
        if (err) {
          res.send(err);
          return res.status(500).json({
            msg: 'Error initializing overview'
          });
        }
        res.json({
          overviewData: newData
        });
      });
    } else res.json({
      overviewData: data[0]
    });
  });
};

routes.POSTeditOverview = function(req, res) {
  console.log(req.query._id, req.body.newData);
  Overview.findOneAndUpdate({
    _id: req.query._id
  }, {
    overview: req.body.newData
  }, function(err, data) {
    console.log('update', data);
    if (err) {
      res.send(err);
      return res.status(200).json({
        msg: 'Error editing overview data'
      });
    } else res.json({
      overviewData: data
    });
  });
};

module.exports = routes;
