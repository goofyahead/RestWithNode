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
var HTTPS_PORT = 443;

var options = {
  key: fs.readFileSync('./manageat-key.pem'),
  cert: fs.readFileSync('./manageat-cert.pem')
};

app.configure(function(){
	app.use(express.bodyParser());
	app.use('/images', express.static(__dirname + '/public/images'));
	app.use('/videos', express.static(__dirname + '/public/videos'));
});

app.get('/api/currentmenu', dishes.getCurrentMenu);

secureApp.configure(function(){
	secureApp.use(express.static(__dirname + '/public'));
	secureApp.use(express.bodyParser());
});

secureApp.post('/api/login', logOn.logIn);
secureApp.get('/api/login', logOn.hello);

//STATIC DEFINITION
// secureApp.configure(function(){
// 	secureApp.use(express.static(__dirname + '/public'));
// 	secureApp.use(express.bodyParser());
// });

//GET REQUESTS
secureApp.get('/api/dishes', validation.validate, dishes.findAll);
secureApp.get('/api/dishes/:id', validation.validate, dishes.findById);
secureApp.get('/api/dishes/search/:query?', dishes.query);
secureApp.get('/api/menus', validation.validate, menus.findAll);
secureApp.get('/api/menus/:id', menus.findById);
secureApp.get('/api/tags', tags.findAll);
secureApp.get('/api/tags/:id', tags.findById);
secureApp.get('/api/ingredients', ingredients.findAll);
secureApp.get('/api/ingredients/:id', ingredients.findById);
secureApp.get('/api/categories', categories.findAll);
secureApp.get('/api/categories/:id', categories.findById);
secureApp.get('/api/login', logOn.redirect);
//PUT REQUEST
secureApp.put('/api/dishes/:id', dishes.updateDish);
secureApp.put('/api/categories/:id', categories.updateCategory);
secureApp.put('/api/menus/:id', menus.updateMenu);
secureApp.put('/api/tags/:id', tags.updateTag);
secureApp.put('/api/ingredients/:id', ingredients.updateIngredient);
//POST REQUEST
secureApp.post('/api/dishes', dishes.addDish);
secureApp.post('/api/categories', categories.addCategory);
secureApp.post('/api/menus', menus.addMenu);
secureApp.post('/api/tags', tags.addTag);
secureApp.post('/api/login', logOn.redirect);
secureApp.post('/api/ingredients', ingredients.addIngredient);
secureApp.post('/api/file-upload', files.uploadPhoto);
secureApp.post('/api/video-upload', files.uploadVideo);
//DELETE REQUEST
secureApp.delete('/api/dishes/:id', dishes.deleteDish);
secureApp.delete('/api/categories/:id', categories.deleteCategory);
secureApp.delete('/api/menus/:id', menus.deleteMenu);
secureApp.delete('/api/ingredients/:id', ingredients.deleteIngredient);
secureApp.delete('/api/tags/:id', tags.deleteTag);

https.createServer(options, secureApp).listen(HTTPS_PORT);
app.listen(HTTP_PORT);
console.log('Listening on port 3000 and on 8443...');