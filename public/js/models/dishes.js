define(['backbone', 'underscore', 'jquery','models/dish', 'models/collectionErrorHandler'],
 function(Backbone, _, $, Dish, CollectionErrorHandler){

	var DishList = CollectionErrorHandler.extend({

		model: Dish,
		url: 'api/dishes',
	});

	return DishList;
});