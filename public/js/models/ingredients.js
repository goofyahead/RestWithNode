// category menu

define(['backbone','models/ingredient', 'models/collectionErrorHandler'],
 function(Backbone, Ingredient, CollectionErrorHandler){

	var Ingredients = CollectionErrorHandler.extend({
		url: '/api/ingredients',
		model: Ingredient
	});

	return Ingredients;
});