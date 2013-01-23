// Retrieve
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSONPure;
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

var db = new Db('kaprika', new Server("127.0.0.1", 27017,
   {auto_reconnect: false, poolSize: 4}), {w:0, native_parser: false});

// Establish connection to db
db.open(function(err, db) {
  if(err) { 
    return console.dir(err);
} else {
    //opens the database and the menus collection
    db.createCollection('menus', {safe:true}, function(err, collection) {
        if (err) {
            //TODO ESTO ESTA MAL NO FUNCIONA NUNCA
            console.log("The 'menus' collection doesn't exist. Creating it with sample data...");
        } else {
            console.log("Collection 'menus' exists.");
        }
    });
}
});

exports.findAll = function(req, res) {
    console.log('login called on https' + req.params);
    var userObjetc = req.body;
    var user = userObjetc.userName;
    var pass = userObjetc.password;
    var shashum = crypto.createHash('sha256');

    var content = user + ":" + pass;
    console.log(content);
    var cyphered = shashum.update(content).digest('hex');

    console.log(cyphered);

    if (true) {
        res.send(403, { error: 'something blew up' });
    }

    // console.log('Retrieving all menus:');
    // db.collection('menus', function(err, collection) {
    //     collection.find().toArray(function(err, items) {
    //         console.log(items);
    //         res.send(items);
    //     });
    // });
};

exports.addMenu = function(req, res) {
    var menu = req.body;
    console.log('Adding menu: ' + JSON.stringify(menu));
    db.collection('menus', function(err, collection) {
        collection.insert(menu, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.deleteMenu = function(req, res) {
    console.log('************deleting menu**************');

    var id = req.params.id;
    var name = '';

    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('menus', function(err, collection) {
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

                    console.log('Deleting menu: ' + id + ' with name ' + name);

                    db.collection('dishes', function(err, dishCollection) {
                        if (err) {
                            console.log('error opening dishes collection on delete');
                        } else {
                            console.log('opening ok');
                            dishCollection.update( { menu : name } ,{ $pull: { menu: name }}, {w:1, multi:true}, function (err, result) {
                                console.log(result);
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving menu: ' + id);
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('menus', function(err, collection) {
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

exports.updateMenu = function(req, res) {
    var id = req.params.id;
    var menu = req.body;
    console.log('Updating menu: ' + id);
    console.log(menu);
    delete menu._id;
    delete menu.id;
    try{
        var obj_id = BSON.ObjectID.createFromHexString(id);
    }catch (err){
        res.send('invalid request');
        console.log('invalid request');
    }
    db.collection('menus', function(err, collection) {
        collection.update({'_id': obj_id}, menu, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating menu: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(menu);
            }
        });
    });
}