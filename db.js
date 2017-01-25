// This will move to its own file but we'll progress through these commits like we will the course
// database connection to local postgres running on default port, named 'workoutlog'
// username: postgres  pwd: password
var Sequelize = require('sequelize');

var sequelize = new Sequelize('workoutlog', 'postgres', 'Letmein1234!', {
	host: 'localhost',
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

var User = sequelize.import('./models/user');
var Log = sequelize.import('./models/log');
var Definition = sequelize.import('./models/definition');

// // setKeys
// User.hasMany(Log, {foreignKey: "owner"});
// Log.belongsTo(User, {foreignKey: "owner"});

// Definition.hasMany(Log, {foreignKey: "def" });
// Log.belongsTo(Definition, {foreignKey: "def"});

// User.hasMany(Definition, {foreignKey: "owner"});
// Definition.belongsTo(User, {foreignKey: "owner"});

module.exports = sequelize;