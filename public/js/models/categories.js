//categories
define(['backbone', 'underscore', 'jquery','models/category', 'models/collectionErrorHandler'],
 function(Backbone, _, $, Category, CollectionErrorHandler){

	var Categories = CollectionErrorHandler.extend({

		model: Category,
		url: 'api/categories',
	});

	return Categories;
});