// menu collection definition

define(['backbone','models/menu'], function(Backbone, Menu){
	var Menus = Backbone.Collection.extend({
		model: Menu,
		url: 'api/menus'
	});

	return Menus;
});