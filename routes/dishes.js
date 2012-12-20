exports.findAll = function(req,res) {
	res.send([
		{name:'hamburguesa de arzicuerzano', descripcion: 'tremenda'},
		{name:'toro de lidia', descripcion: 'complejo'}]);
};

exports.findById = function(req,res) {
	res.send(
		{id: req.params.id, name: "hamburguesa especifica", descripcion: "sabroso"});
};