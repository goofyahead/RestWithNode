var express = require('express');
var app = express();
var dishes = require('./routes/dishes');
var categories = require('./routes/categories');
var menus = require('./routes/menus');
var ingredients = require('./routes/ingredients');
var tags = require('./routes/tags');

//STATIC DEFINITION
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

//GET REQUESTS
app.get('/api/dishes', dishes.findAll);
app.get('/api/dishes/:id', dishes.findById);
app.get('/api/menus', menus.findAll);
app.get('/api/tags', tags.findAll);
app.get('/api/ingredients', ingredients.findAll);
app.get('/api/categories', categories.findAll);
//PUT REQUEST
app.put('/api/dishes/:id', dishes.updateDish);
//POST REQUEST
app.post('/api/dishes', dishes.addDish);
//DELETE REQUEST
app.delete('/api/dishes/:id', dishes.deleteDish);

app.listen(3000);
console.log('Listening on port 3000...');