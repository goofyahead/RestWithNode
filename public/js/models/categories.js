//categories
define(['backbone', 'underscore', 'jquery','models/category'], function(Backbone, _, $, Category){

	var Categories = Backbone.Collection.extend({

		model: Category,
		url: 'api/categories',

		initialize: function(){
			console.log('initializing dishList');
		 	this.on('reset', this.alertReset);
		},

		alertReset: function(){
			console.log('reset collection model');
		}
	});

	return Categories;
});