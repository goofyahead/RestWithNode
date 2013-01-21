// Retrieve
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSONPure;
var MongoClient = require('mongodb').MongoClient;
//non db dependencies
var crypto = require('crypto');

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

exports.hello = function(req, res) {
	res.send('hellooooo');
},

exports.redirect = function (req, res) {
	console.log('redirecting');
	var hostName = req.headers.host.split(':')[0];
	res.redirect("https://" + hostName + ':8443' + req.url);
},

exports.logIn = function (req, res){
	console.log('login called on https');
	var user = req.params.userName;
	var pass = req.params.password;
	var shashum = crypto.createHash('sha256');

	var content = 'user:pass';
	var cyphered = shashum.update(content).digest('hex');

	console.log(cyphered);

	// db.collection('users', function(err, collection) {
	// 	if (err){
	// 		console.log('not found');
	// 	} else {
	// 		collection.findOne({'user': obj_id}, function(err, item) {
	// 			if(err) {
	// 				console.log('not found');
	// 				res.send('nothing found');
	// 			} else {
	// 				if (item.password == pass) {
	// 					res.send("true");
	// 				} else {
	// 					res.send("false");
	// 				}
	// 				console.log(item);
	// 			}
	// 		});
	// 	}
	// });
};