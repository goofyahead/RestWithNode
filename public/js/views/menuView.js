//category definition
define(['backbone','text!templates/menuView.html'], function (Backbone, myTemplate){
	var CategoryView = Backbone.View.extend({

		template: _.template(myTemplate),

		tagName: 'div',
		id: 'menu',

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.render, this);
		},

		events: {
			'click #save-basic-changes' : 'save_basic',
			'click #delete' : 'delete',
			'click #current-menu' : 'toggleMenu'
		},

		toggleMenu: function (event) {
			this.model.toggleActive();
		},

		delete: function() {
			this.model.deleteMyself();
			this.remove();
  			this.unbind();
		},

		save_basic: function() {
			var name = $('#inputName').val();
			var description = $('#inputDescription').val();
			this.model.updateBasicInfo(name,description);
		},

		render: function(){
			console.log('rendering categoryView');
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return CategoryView;
});