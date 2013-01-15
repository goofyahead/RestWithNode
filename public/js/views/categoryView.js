//category definition
define(['backbone','text!templates/category.html'], function (Backbone, categoryTemplate){
	var CategoryView = Backbone.View.extend({

		template: _.template(categoryTemplate),

		tagName: 'div',
		id: 'category',

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.render, this);
		},

		events: {
			'click #save-basic-changes' : 'save_basic',
			'click #delete' : 'deleteCategory'
		},

		deleteCategory: function() {
			this.model.deleteMyself();
			Backbone.history.navigate('/', {trigger: true});
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