// category menu

define(['backbone'], function(Backbone){

	var Ingredient = Backbone.Model.extend({
		urlRoot: '/api/ingredients'
	});

	return Ingredient;
});