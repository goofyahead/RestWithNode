var express = require('express');
var app = express();
var dishes = require('./routes/dishes');

app.get('/dishes', dishes.findAll);

app.get('/dishes/:id', dishes.findById);

app.listen(3000);
console.log('Listening on port 3000');