//Modal view definition

define(['backbone', 'text!templates/modal.html'], function(Backbone, template){
	var ModalView = Backbone.View.extend({
		template: _.template(template),

		tagName: 'div',
		id: 'modal',

		events: {
			'click button': 'button_clicked'
		},

		button_clicked: function(e){
			console.log('clicked');
		},

		render: function(){
			var compiledTemplate = this.template({
            	myCategos: this.collection.toJSON()
        	});
			this.$el.html(compiledTemplate);
			return this;
		}
	});

	return ModalView;
})