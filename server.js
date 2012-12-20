var express = require('express');
var app = express();

app.get('/dishes', function(req, res){
	res.send([{name:'hamburguesa'}, {name: 'lasagna'}]);
});

app.get('/dishes/:id', function(req, res){
	res.send({id: req.params.id, name: "hamburguesa", description: "buenisima"});
});

app.listen(3000);