define(['backbone', 'text!templates/picture_modal.html'], function(Backbone, template){
	var ModalView = Backbone.View.extend({

		template: _.template(template),

		tagName: 'div',
		id: 'modal',

		initialize: function(){
			//reset arrays
		},

		events: {
			'click #picture' : 'select_picture'
		},

		select_picture: function(ev) {
			$('#myModal').modal('hide');
			var selectedPicture = ev.currentTarget.alt;
			this.options.model.updateThumbnail(selectedPicture);
			$.post("/api/clear-files", {'fileName' : selectedPicture },
				  function(data){
				    console.log(data);
				  }, "json");
		},

		render: function(){
			console.log(this.options.having);
			var compiledTemplate = this.template({
				pictures: this.options.pictures
			});
			this.$el.html(compiledTemplate);
			return this;
		}
	});

	return ModalView;
})