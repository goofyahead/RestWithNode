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
    db.createCollection('dishes', {safe:true}, function(err, collection) {
        if (err) {
            console.log("The 'dishes' collection doesn't exist. Creating it with sample data...");
        } else {
            console.log("Collection 'dishes' exists.");
        }
        });
    }
});

exports.query = function (req, res){
    console.log('query captured');
    console.log(req.query);
    var type = req.query.type;
    var value = req.query.value;
    console.log(type + " : " + value);
    var temp = {};
    temp[type] = value;
    db.collection('dishes', function(err, collection) {
            if (err){
                console.log('not found');
            } else {
                collection.find(temp).toArray(function(err, items) {
                    if(err) {
                        console.log('not found');
                        res.send('nothing found');
                    } else {
                        console.log(items);
                        res.send(items);
                    }
                });
            }
        });
};

exports.findById = function(req, res) {
    // if (checkAuth(req, res)){
        var id = req.params.id;
        console.log('Retrieving dish: ' + id);
        try{
            var obj_id = BSON.ObjectID.createFromHexString(id);
        }catch (err){
            res.send('invalid request');
            console.log('invalid request');
        }
        db.collection('dishes', function(err, collection) {
            if (err){
                console.log('not found');
            } else {
                collection.findOne({'_id': obj_id}, function(err, item) {
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
    // }
};

exports.updateDish = function(req, res) {
    var id = req.params.id;
    var dish = req.body;
    console.log('Updating dish: ' + id);
    console.log(dish);
    delete dish._id;
    delete dish.id;
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('dishes', function(err, collection) {
        collection.update({'_id': obj_id}, dish, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating dish: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(dish);
            }
        });
    });
};
 
exports.findAll = function(req, res) {
    console.log('Retrieving all dishes:');
    db.collection('dishes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.addDish = function(req, res) {
    var dish = req.body;
    console.log('Adding dish: ' + JSON.stringify(dish));
    db.collection('dishes', function(err, collection) {
        collection.insert(dish, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
exports.deleteDish = function(req, res) {
    var id = req.params.id;
    console.log('Deleting dish: ' + id);
    db.collection('dishes', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                collection.update( {} ,{$pull: {recommendations: {_id: id}}}, {w:1, multi:true}, function (err, result) {
                                console.log(result);
                });
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

checkAuth = function(req, res){
    console.log('new parameter ' + req.query.element);
    var auth = req.headers.authorization;
    console.log('headers ' + auth);
    var user = auth.split(':')[0];
    console.log(user);
    if (req.params.auth === 'AAAA'){
        return true;
    } else {
        res.send('auth error',401);
        return false;
    }
};