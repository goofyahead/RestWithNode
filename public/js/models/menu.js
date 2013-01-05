// category menu

define(['backbone'], function(Backbone){

	var Menu = Backbone.Model.extend({
		urlRoot: '/api/menus'
	});

	return Menu;
});