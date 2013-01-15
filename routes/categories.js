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

exports.addCategory = function(req, res) {
    var category = req.body;
    console.log('Adding category: ' + JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.insert(category, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCategory = function(req, res) {
    var id = req.params.id;
    var category = req.body;
    console.log('Updating categoru: ' + id);
    console.log(category);
    delete category._id;
    delete category.id;
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('categories', function(err, collection) {
        collection.update({'_id': obj_id}, category, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating category: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(category);
            }
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving category: ' + id);
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('categories', function(err, collection) {
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
};

exports.deleteCategory = function(req, res) {
    var id = req.params.id;
    var name = '';

    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('categories', function(err, collection) {
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

                    console.log('Deleting category: ' + id + 'with name ' + name);

                    db.collection('dishes', function(err, dishCollection) {
                        if (err) {
                            console.log('error opening dishes collection on delete');
                        } else {
                            console.log('opening ok');
                            dishCollection.update( { categories : name} ,{$pull: {categories: name}}, {w:1, multi:true}, function (err, result) {
                                console.log(result);
                            });
                        }
                    });
                }
            });
        }
    });
};
