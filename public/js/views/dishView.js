// View definition importing its html for rendering

define(['backbone','jquery','text!templates/dish.html','views/modal','bootstrap','models/categories'], 
	function(Backbone, $, dish, ModalView, bootstrap, Categories){
	var DishView = Backbone.View.extend({
		template: _.template(dish),

		tagName: 'div',
		id: 'dish',

		initialize: function(){
			this.model.on('change', this.render, this);
		},

		events: {
			'click  #menus-menu .newItem': 'launch_modal_menu',
			'click #categories-menu .newItem': 'launch_modal_categories',
		},

		launch_modal_menu: function(ev){
			console.log('launching modal');
			var modal = new ModalView();
			modal.render();
			$('#modalplacer').html(modal.el);
			$('#myModal').modal();
		},

		launch_modal_categories: function(ev){
			var thisView = this;
			var categories = new Categories();
			categories.fetch({
	            success: function(){
					var modal = new ModalView(
						{collection: categories,
						 having: thisView.model.toJSON()
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });		
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return DishView;
});