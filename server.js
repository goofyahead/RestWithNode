var express = require('express');
var app = express();
var secureApp = express();
var dishes = require('./routes/dishes');
var categories = require('./routes/categories');
var menus = require('./routes/menus');
var ingredients = require('./routes/ingredients');
var tags = require('./routes/tags');
var files = require('./routes/files');
var logOn = require('./routes/logon');
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./manageat-key.pem'),
  cert: fs.readFileSync('./manageat-cert.pem')
};

secureApp.configure(function(){
	app.use(express.bodyParser());
});

secureApp.post('/api/logIn', logOn.logIn);

//STATIC DEFINITION
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

//GET REQUESTS
app.get('/api/dishes', dishes.findAll);
app.get('/api/dishes/:id', dishes.findById);
app.get('/api/dishes/search/:query?', dishes.query);
app.get('/api/menus', menus.findAll);
app.get('/api/menus/:id', menus.findById);
app.get('/api/tags', tags.findAll);
app.get('/api/tags/:id', tags.findById);
app.get('/api/ingredients', ingredients.findAll);
app.get('/api/ingredients/:id', ingredients.findById);
app.get('/api/categories', categories.findAll);
app.get('/api/categories/:id', categories.findById);
//PUT REQUEST
app.put('/api/dishes/:id', dishes.updateDish);
app.put('/api/categories/:id', categories.updateCategory);
app.put('/api/menus/:id', menus.updateMenu);
app.put('/api/tags/:id', tags.updateTag);
app.put('/api/ingredients/:id', ingredients.updateIngredient);
//POST REQUEST
app.post('/api/dishes', dishes.addDish);
app.post('/api/categories', categories.addCategory);
app.post('/api/menus', menus.addMenu);
app.post('/api/tags', tags.addTag);
app.post('/api/ingredients', ingredients.addIngredient);
app.post('/api/file-upload', files.uploadPhoto);
app.post('/api/video-upload', files.uploadVideo);
//DELETE REQUEST
app.delete('/api/dishes/:id', dishes.deleteDish);
app.delete('/api/categories/:id', categories.deleteCategory);
app.delete('/api/menus/:id', menus.deleteMenu);
app.delete('/api/ingredients/:id', ingredients.deleteIngredient);
app.delete('/api/tags/:id', tags.deleteTag);

http.createServer(app).listen(3000);
https.createServer(options, secureApp).listen(8443);
console.log('Listening on port 3000...');