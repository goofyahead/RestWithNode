// View definition importing its html for rendering

define(['backbone','jquery','text!templates/dish.html'], function(Backbone, $, dish){
	var DishView = Backbone.View.extend({
		template: _.template(dish),

		tagName: 'div',
		id: 'dish',

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));	
		}
	});

	return DishView;
});