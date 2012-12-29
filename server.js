var express = require('express');
var app = express();
var dishes = require('./routes/dishes');

//STATIC DEFINITION
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

//GET REQUESTS
app.get('/dishes', dishes.findAll);
app.get('/dishes/:id', dishes.findById);
//PUT REQUEST
app.put('/dishes/:id', dishes.updateDish);
//POST REQUEST
app.post('/dishes', dishes.addDish);
//DELETE REQUEST
app.delete('/dishes/:id', dishes.deleteDish);

app.listen(3000);
console.log('Listening on port 3000...');