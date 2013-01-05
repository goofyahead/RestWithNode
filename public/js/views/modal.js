//Modal view definition

define(['backbone', 'text!templates/modal.html'], function(Backbone, template){
	var ModalView = Backbone.View.extend({

		selection: [],

		template: _.template(template),

		tagName: 'div',
		id: 'modal',

		initialize: function(){
			console.log("initializing ++++++++++++++++++++++++++++");
			console.log(this.options.having.get(this.options.what));
			this.selection = this.options.having.get(this.options.what);
		},

		events: {
			'click #save-modal' : 'save_clicked',
			'click #modal-element': 'button_clicked'
		},

		save_clicked: function(ev){
			this.options.having.updateFields(this.options.what, this.selection);
		},

		button_clicked: function(ev){
			console.log('clicked');
			var textTarget = $(ev.currentTarget).text().trim();
			if ($(ev.currentTarget).hasClass("btn-primary")){
				$(ev.currentTarget).removeClass("btn-primary");
				console.log(this.selection);
				console.log('position of current:' + textTarget + ':in: ' + this.selection.indexOf(textTarget));
				this.selection.splice(this.selection.indexOf(textTarget),1);
				console.log('afer removing ' + this.selection);
			} else {
				$(ev.currentTarget).addClass("btn-primary");
				this.selection.push($(ev.currentTarget).text().trim());
			}
		},

		render: function(){
			console.log(this.options.having);
			var compiledTemplate = this.template({
            	myCategos: this.collection.toJSON(),
            	myHaving: this.options.having.get(this.options.what)
        	});
			this.$el.html(compiledTemplate);
			return this;
		}
	});

	return ModalView;
})