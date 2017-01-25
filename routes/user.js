var router = require('express').Router();
var sequelize = require('../db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
var User = sequelize.import('../models/user');

router.post('/', function(req, res) {
    // req has some body properties that have a username and pwd
    var username = req.body.user.username; // user: { username: 'blah', password: 'boo' }
    var pass = req.body.user.password; // TODO: encrypt/hash this

    // Use our sequlize model to create user
    User
	    .create({ 
	    	username: username,
	    	passwordhash: bcrypt.hashSync(pass, 10) 
	    })
	    .then(
	    	function createSuccess(user) {
	    		var token = jwt.sign({ id: user.id}, constants.JWT_SECRET, { expiresIn: 60*60*24 });
		        res.json({
		          user: user,
		          message: 'created',
		          sessionToken: token 
		        });
		    }, 
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

module.exports = router;


/* 
	test this in Postman (chrome extension) http://localhost:3000/api/user

	using the following in the body as "raw" "application/json"
	{
	    "user":{
	    "username":"frodobaggins",
	    "password":"password!!!"}
	}

	expected response:

	{
  "user": {
    "id": 1,
    "username": "frodobaggins",
    "passwordhash": "",
    "updatedAt": "2016-06-06T17:34:51.724Z",
    "createdAt": "2016-06-06T17:34:51.724Z"
  },
  "message": "created"
}
*/
