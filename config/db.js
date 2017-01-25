// This moved to its own file but we'll progress through these commits like we will the course
// database connection to local postgres running on default port, named 'workoutlog'
// username: postgres  pwd: password
var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', 'password', {
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgresql db');
	},
	function(err) {
		console.log(err);
	}
);

module.exports = sequelize;