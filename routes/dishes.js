var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testa');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('ok connection to db');
});

exports.findAll = function(req,res) {
	res.send([
		{name:'hamburguesa de arzicuerzano', descripcion: 'tremenda'},
		{name:'toro de lidia', descripcion: 'complejo'}]);
};

exports.findById = function(req,res) {
	res.send(
		{id: req.params.id, name: "hamburguesa especifica", descripcion: "sabroso"});
};

exports.addDish = function(req, res){};

exports.updateDish = function(req, res){};

exports.deleteDish = function(req, res){};