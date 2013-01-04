//Model representing the dish state.

define(['backbone'], function(Backbone){
	
	var Dish = Backbone.Model.extend({
		urlRoot: '/api/dishes',

		updateCategories: function( newCategories ){
			this.set({'categories': newCategories});
			this.save();
		}
	});



	return Dish;
});