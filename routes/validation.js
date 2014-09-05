var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db('kaprika', new Server("127.0.0.1", 27017,
	{auto_reconnect: false, poolSize: 4}), {w:0, native_parser: false});

// Establish connection to db
db.open(function(err, db) {
	if(err) { 
		return console.dir(err);
	} else {
    //opens the database and the dishes collection
	}
});

exports.validate = function(req, res, next) {
	console.log('validating authorization');

	var auth = req.headers.authorization;

	// console.log(auth);
	
	db.collection('users', function(err, collection) {
		if (err){
			console.log('not found');
		} else {
			collection.findOne({'key': auth}, function(err, item) {
				if(! item) {
					res.send(401, { error: 'unauthorized' });
					console.log('unauthorized access');
				} else {
					console.log('loged in');
					next();
				}
			});
		}
	});
}