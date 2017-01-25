var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
//var constants = require('../config/constants');

module.exports = function(req, res, next) {
    var sessionToken = req.headers.authorization;

    if (!req.body.user && sessionToken) {
      jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decodedId) {
          if (decodedId) {
            User.findOne({ where: { id: decodedId.id} }).then(function(user) {
                req.user = user;
                next();
            }, function() {
              res.status(401).send({error: 'you are not authorized' });
            });
          } else {
            res.status(401).send({error: 'not authorized' });
          }
      });
    } else {
      next();
    }
};