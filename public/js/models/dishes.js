define(['backbone', 'underscore', 'jquery','models/dish', 'models/collectionErrorHandler'],
 function(Backbone, _, $, Dish, CollectionErrorHandler){

	var DishList = CollectionErrorHandler.extend({

		model: Dish,
		url: 'api/dishes',

		// initialize: function(){
		// 	console.log('initializing dishList');
		//  	this.on('reset', this.alertReset);
		// },

		// alertReset: function(){
		// 	console.log('reset collection model');
		// }
	});

	return DishList;
});