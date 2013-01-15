var express = require('express');
var app = express();
var dishes = require('./routes/dishes');
var categories = require('./routes/categories');
var menus = require('./routes/menus');
var ingredients = require('./routes/ingredients');
var tags = require('./routes/tags');
var files = require('./routes/files');

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
app.get('/api/tags', tags.findAll);
app.get('/api/ingredients', ingredients.findAll);
app.get('/api/categories', categories.findAll);
app.get('/api/categories/:id', categories.findById);
//PUT REQUEST
app.put('/api/dishes/:id', dishes.updateDish);
app.put('/api/categories/:id', categories.updateCategory);
//POST REQUEST
app.post('/api/dishes', dishes.addDish);
app.post('/api/categories', categories.addCategory);
app.post('/api/file-upload', files.uploadPhoto);
app.post('/api/video-upload', files.uploadVideo);
//DELETE REQUEST
app.delete('/api/dishes/:id', dishes.deleteDish);
app.delete('/api/categories/:id', categories.deleteCategory);

app.listen(3000);
console.log('Listening on port 3000...');