define(['backbone', 'underscore', 'jquery','models/dish'], function(Backbone, _, $, Dish){

	var DishList = Backbone.Collection.extend({

		model: Dish,
		url: 'api/dishes',

		initialize: function(){
			console.log('initializing dishList');
		 	this.on('reset', this.alertReset);
		},

		alertReset: function(){
			console.log('reset collection model');
		}
	});

	return DishList;
});