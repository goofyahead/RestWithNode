define(['backbone', 'text!templates/picture_modal.html', 'views/Backbone.ModalDialog'], function(Backbone, template, ModalView){
	var pictureModal = ModalView.extend({

		template: _.template(template),

		pictures: {},

		sender: {},

		tagName: 'div',
		id: 'modal',

		initialize: function(){
			console.log('initializing with ' + this.options.pictures);
			this.pictures = this.options.pictures;
		},

		events: {
			'click #picture' : 'select_picture'
		},

		select_picture: function(ev) {
			this.sender.close();
			var selectedPicture = ev.currentTarget.alt;
			this.options.model.updateThumbnail(selectedPicture);
			$.post("/api/clear-files", {'fileName' : selectedPicture },
				  function(data){
				    console.log(data);
				  }, "json");
		},

		render: function(){
			console.log('rendering picture selector');
			console.log(this.options.pictures);
			var compiledTemplate = this.template({
				pictures: this.options.pictures
			});
			this.$el.html(compiledTemplate);
			return this;
		},

		sender: function(sender) {
			this.sender = sender;
		}
		
	});

	return pictureModal;
})