// menu collection definition

define(['backbone','models/ingredient'], function(Backbone, Ingredient){
	var Ingredients = Backbone.Collection.extend({
		idAttribute: "_id",
		model: Ingredient,
		url: 'api/ingredients'
	});

	return Ingredients;
});