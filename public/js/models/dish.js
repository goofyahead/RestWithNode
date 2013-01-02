//Model representing the dish state.

define(['backbone'], function(Backbone){
	
	var Dish = Backbone.Model.extend({
		urlRoot: '/api/dishes'
	});

	return Dish;
});