// Retrieve
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSONPure;
var MongoClient = require('mongodb').MongoClient;

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

exports.logIn = function (req, res){
	var user = req.params.user;
	var pass = req.params.password;
	var nonce = req.params.nonce;

	db.collection('users', function(err, collection) {
		if (err){
			console.log('not found');
		} else {
			collection.findOne({'user': obj_id}, function(err, item) {
				if(err) {
					console.log('not found');
					res.send('nothing found');
				} else {
					console.log(item);
					res.send(item);
				}
			});
		}
	});
};