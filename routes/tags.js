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
    //opens the database and the tags collection
    db.createCollection('tags', {safe:true}, function(err, collection) {
        if (err) {
            //TODO ESTO ESTA MAL NO FUNCIONA NUNCA
            console.log("The 'tags' collection doesn't exist. Creating it with sample data...");
        } else {
            console.log("Collection 'tags' exists.");
        }
        });
    }
});

exports.findAll = function(req, res) {
    console.log('Retrieving all tags:');
    db.collection('tags', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.addCategory = function(req, res) {
    var tag = req.body;
    console.log('Adding tag: ' + JSON.stringify(tag));
    db.collection('tags', function(err, collection) {
        collection.insert(tag, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    console.log('Deleting tag: ' + id);
    db.collection('tags', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
