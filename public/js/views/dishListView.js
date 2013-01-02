// ListView of dishes for a list on the left side.
define(['backbone','views/dishListElement'], function(Backbone, DishListElement){
	var DishViewList = Backbone.View.extend({
		//attach to an existing element
		el: $('#left_menu'),

		initialize: function(){
			this.collection.on('reset', this.addAll, this);
		},

		render: function(){
			this.addAll();
		},

		addOne: function(dish){
			console.log('painting each view element ' + dish.toJSON);
			var dishListElement = new DishListElement({model: dish});
			this.$el.append(dishListElement.render().el);
		},

		addAll: function(){
			console.log('add all called');
			$('#left_list_header').html('Lista de platos');
			this.collection.forEach(this.addOne, this);
		}
	});

	return DishViewList;
});
