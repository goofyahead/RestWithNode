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
    //opens the database and the ingredients collection
    db.createCollection('ingredients', {safe:true}, function(err, collection) {
        if (err) {
            //TODO ESTO ESTA MAL NO FUNCIONA NUNCA
            console.log("The 'ingredients' collection doesn't exist. Creating it with sample data...");
        } else {
            console.log("Collection 'ingredients' exists.");
        }
        });
    }
});

exports.findAll = function(req, res) {
    console.log('Retrieving all ingredients:');
    db.collection('ingredients', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.addIngredient = function(req, res) {
    var ingredient = req.body;
    console.log('Adding ingredient: ' + JSON.stringify(ingredient));
    db.collection('ingredients', function(err, collection) {
        collection.insert(ingredient, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.deleteIngredient = function(req, res) {
   var id = req.params.id;
    var name = '';

    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('ingredients', function(err, collection) {
        if (err){
            console.log('not found');
        } else {
            collection.findOne({'_id': obj_id}, function(err, item) {
                if(err) {
                    console.log('not found');
                    res.send('nothing found');
                } else {
                    console.log(item);
                    name = item.name;

                    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                        if (err) {
                            res.send({'error':'An error has occurred - ' + err});
                        } else {
                            console.log('' + result + ' document(s) deleted');
                            res.send(req.body);
                        }
                    });

                    console.log('Deleting ingredient: ' + id + 'with name ' + name);

                    db.collection('dishes', function(err, dishCollection) {
                        if (err) {
                            console.log('error opening dishes collection on delete');
                        } else {
                            console.log('opening ok');
                            dishCollection.update( { ingredients : name} ,{$pull: {ingredients: name}}, {w:1, multi:true}, function (err, result) {
                                console.log(result);
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.updateIngredient = function(req, res) {
    var id = req.params.id;
    var ingredient = req.body;
    console.log('Updating categoru: ' + id);
    console.log(ingredient);
    delete ingredient._id;
    delete ingredient.id;
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('ingredients', function(err, collection) {
        collection.update({'_id': obj_id}, ingredient, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating ingredient: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(ingredient);
            }
        });
    });
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving ingredient: ' + id);
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('ingredients', function(err, collection) {
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
}
