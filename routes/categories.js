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
    //opens the database and the categories collection
    db.createCollection('categories', {safe:true}, function(err, collection) {
        if (err) {
            //TODO ESTO ESTA MAL NO FUNCIONA NUNCA
            console.log("The 'categories' collection doesn't exist. Creating it with sample data...");
            populateDB();
        } else {
            console.log("Collection 'categories' exists.");
        }
        });
    }
});

exports.findAll = function(req, res) {
    console.log('Retrieving all categories:');
    db.collection('categories', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};


var populateDB = function() {
 
    var categories = [{name: 'entrantes'},{name: 'segundos'}];
 
    db.collection('categories', function(err, collection) {
        collection.insert(categories, {safe:true}, function(err, result) {
            if (err){
                console.log('Error inserting on database' + err);
            }
        });
    });
 
};