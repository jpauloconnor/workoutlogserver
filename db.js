// This will move to its own file but we'll progress through these commits like we will the course
//postgres://postgres:password@localhost:5432/workoutlog
// database connection to local postgres running on default port, named 'workoutlog'
// username: postgres  pwd: password
var Sequelize = require('sequelize');

// postgres://postgres:password@localhost:5432/workoutlog
var sequelize = new Sequelize(process.env.DATABASE_URL, {
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
// var Log = sequelize.import('./models/log');
// var Definition = sequelize.import('./models/definition');

// // setKeys
// User.hasMany(Log, {foreignKey: "owner"});
// Log.belongsTo(User, {foreignKey: "owner"});

// Definition.hasMany(Log, {foreignKey: "def" });
// Log.belongsTo(Definition, {foreignKey: "def"});

// User.hasMany(Definition, {foreignKey: "owner"});
// Definition.belongsTo(User, {foreignKey: "owner"});

module.exports = sequelize;