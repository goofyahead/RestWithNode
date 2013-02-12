var express = require('express');
var secureApp = express();
var app = express();
var securesecureApp = express();
var dishes = require('./routes/dishes');
var categories = require('./routes/categories');
var menus = require('./routes/menus');
var ingredients = require('./routes/ingredients');
var validation = require('./routes/validation.js');
var tags = require('./routes/tags');
var files = require('./routes/files');
var logOn = require('./routes/logon');
var https = require('https');
var http = require('http');
var fs = require('fs');
var HTTP_PORT= 80;
var HTTPS_PORT = 4433;
var HTTP_PORT_2 = 8081;

var options = {
  key: fs.readFileSync('./manageat-key.pem'),
  cert: fs.readFileSync('./manageat-cert.pem')
};

// app.configure(function(){
// 	app.use(express.bodyParser());
// 	app.use('/images', express.static(__dirname + '/public/images'));
// 	app.use('/videos', express.static(__dirname + '/public/videos'));
// });

//API to get the current menu
// app.get('/api/currentmenu', dishes.getCurrentMenu);
secureApp.get('/api/currentmenu', dishes.getCurrentMenu);

secureApp.configure(function(){
	secureApp.use(express.static(__dirname + '/public'));
	app.use('/images', express.static(__dirname + '/public/images'));
	app.use('/videos', express.static(__dirname + '/public/videos'));
	secureApp.use(express.bodyParser());
});

//GET REQUESTS
secureApp.get('/api/dishes', validation.validate, dishes.findAll);
secureApp.get('/api/dishes/:id', validation.validate, dishes.findById);
secureApp.get('/api/dishes/search/:query?', validation.validate, dishes.query);
secureApp.get('/api/menus', validation.validate, menus.findAll);
secureApp.get('/api/menus/:id', validation.validate, menus.findById);
secureApp.get('/api/tags', validation.validate, tags.findAll);
secureApp.get('/api/tags/:id', validation.validate, tags.findById);
secureApp.get('/api/ingredients', validation.validate, ingredients.findAll);
secureApp.get('/api/ingredients/:id', validation.validate, ingredients.findById);
secureApp.get('/api/categories', validation.validate, categories.findAll);
secureApp.get('/api/categories/:id', validation.validate, categories.findById);

//PUT REQUEST
secureApp.put('/api/dishes/:id', validation.validate, dishes.updateDish);
secureApp.put('/api/categories/:id', validation.validate, categories.updateCategory);
secureApp.put('/api/menus/:id', validation.validate, menus.updateMenu);
secureApp.put('/api/tags/:id', validation.validate, tags.updateTag);
secureApp.put('/api/ingredients/:id', validation.validate, ingredients.updateIngredient);

//POST REQUEST
secureApp.post('/api/login', logOn.logIn);
secureApp.post('/api/dishes', validation.validate, dishes.addDish);
secureApp.post('/api/categories', validation.validate, categories.addCategory);
secureApp.post('/api/menus', validation.validate, menus.addMenu);
secureApp.post('/api/tags', validation.validate, tags.addTag);
secureApp.post('/api/ingredients', validation.validate, ingredients.addIngredient);
secureApp.post('/api/file-upload', files.uploadPhoto);
secureApp.post('/api/video-upload', validation.validate, files.uploadVideo);

//DELETE REQUEST
secureApp.delete('/api/dishes/:id', validation.validate, dishes.deleteDish);
secureApp.delete('/api/categories/:id', validation.validate, categories.deleteCategory);
secureApp.delete('/api/menus/:id', validation.validate, menus.deleteMenu);
secureApp.delete('/api/ingredients/:id', validation.validate, ingredients.deleteIngredient);
secureApp.delete('/api/tags/:id', validation.validate, tags.deleteTag);

// https.createServer(options, secureApp).listen(HTTPS_PORT);
// secureApp.listen(HTTP_PORT);
secureApp.listen(HTTP_PORT);
console.log('Listening on port 3000 and on 8443...');