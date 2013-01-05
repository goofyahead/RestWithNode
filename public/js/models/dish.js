//Model representing the dish state.

define(['backbone'], function(Backbone){
	
	var Dish = Backbone.Model.extend({
		urlRoot: '/api/dishes',

		updateFields: function( what, updates  ){
			console.log('updating model ' + what + ' with: ' + updates);
			this.set(what, updates);
			this.save();
			this.trigger('change');
		}
	});

	return Dish;
});