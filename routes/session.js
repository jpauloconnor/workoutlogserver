var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

router.post('/', function(req, res) {
    User.findOne({ where: { username: req.body.user.username} }).then(
        function(user) {
            if (user) {
              bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                  if (matches) {
                    var sessionToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn:  24*60*60 });
                    res.json({
                      user: user,
                      message: 'succesfully authed',
                      sessionToken: sessionToken
                    });
                  } else {
                    res.status(500).send({ error: "failed to authenticate"});
                  }
              });
            } else {
              res.status(500).send({ error: "failed to authenticate"});
            }
        },
        function(err) {
          // could not find user
          res.json(err);
        }
    );
});

module.exports = router;