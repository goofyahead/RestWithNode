//Element for rendering each dish on a list

define(['backbone','text!templates/dishElement.html'],function(Backbone, template){
	var DishListElement = Backbone.View.extend({
		template: _.template(template),

		tagName: 'li',
		id: 'dish',

		render: function(){
			console.log('modelo de dish element' + this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return DishListElement;
});