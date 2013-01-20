// category menu

define(['backbone','models/ingredient'], function(Backbone, Ingredient){

	var Ingredients = Backbone.Collection.extend({
		url: '/api/ingredients',
		model: Ingredient
	});

	return Ingredients;
});