// category menu

define(['backbone'], function(Backbone){

	var Menu = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/menus'
	});

	return Menu;
});