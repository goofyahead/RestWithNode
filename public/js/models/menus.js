// menu collection definition

define(['backbone','models/menu','models/collectionErrorHandler'], function(Backbone, Menu, CollectioErrorHandler){
	
	var Menus = CollectioErrorHandler.extend({
		model: Menu,
		url: 'api/menus',
	});

	return Menus;
});