var mongoose = require('mongoose');
var Route = require('../models/routeModel.js');

exports.getAllRoutes = function(req, res) {
  Route.find({}, function(err, routes) {
    if (err) {
      logger.error('ERROR in getAllPOI: ', err);
      return res.json(err);
    } 
      
    // logger.info('Successfully retrieved pois: ' + pois);
    res.json(routes); 
  });
};

exports.updateRoute = function (req, res) {
  var route = req.body;
  
  Route.findOneAndUpdate({ '_id': route['_id'] }, route, { },
    function (err, route) {
      res.json(route);
  });
};

exports.getRoutesNearUser = function(req, res) {
  Route.find({
    loc: {
      $near: {
        $geometry: {
          type: "Point", 
          coordinates: [req.body[0], req.body[1]] 
        }, 
        $maxDistance: 3000
      } 
    } 
  }, function(err, routes){
    res.send(routes);
  })
};

