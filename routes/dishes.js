/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testa');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('ok connection to db');
});*/

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
            populateDB();
        } else {
            console.log("Collection 'dishes' exists.");
        }
        });
    }
});

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
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('dishes', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateDish = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('dishes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}
 
exports.deleteDish = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('dishes', function(err, collection) {
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

var populateDB = function() {
 
    var dishes = [
    {
    	menu: [1],
        name: "Tosta de canguro",
        description: "Una suave tostada de pan con unos trozos de fresco canguro.",
        price: 4.95,
        categories: ["Entrante","Tostas"],
        ingredients: ["Canguro","pan","aceite","mayonesa"],
        recomandations: [],
        tags: [],
        image: "tosta_canguro.jpg",
        video: "tosta_canguro.mov"
    },
    {
    	menu: [1],
        name: "Tosta de queso de cabra",
        description: "Una suave tostada de pan con queso de cabra caramelizado.",
        price: 4.95,
        categories: ["Entrante","Tostas"],
        ingredients: ["Queso","pan","cebolla","mayonesa"],
        recomandations: [],
        tags: [],
        image: "tosta_queso.jpg",
        video: "tosta_queso.mov"
    }];
 
    db.collection('dishes', function(err, collection) {
        collection.insert(dishes, {safe:true}, function(err, result) {
            if (err){
                console.log('Error inserting on database' + err);
            }
        });
    });
 
};
