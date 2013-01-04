//Model representing the dish state.

define(['backbone'], function(Backbone){
	
	var Dish = Backbone.Model.extend({
		urlRoot: '/api/dishes',

		updateCategories: function( newCategories ){
			console.log('updating model categories with: ' + newCategories);
			this.set({'categories': newCategories});
			this.save();
			this.trigger('change');
		}
	});

	return Dish;
});