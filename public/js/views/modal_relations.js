//Modal view definition

define(['backbone', 'text!templates/modal_search.html'], function(Backbone, template){
	var ModalView = Backbone.View.extend({

		selection: [],
		posibilities: [],
		finalSelection: [],

		template: _.template(template),

		tagName: 'div',
		id: 'modal',

		initialize: function(){
			//reset arrays
			this.posibilities = [];
			this.selection = [];
			this.finalSelection = [];

			console.log("getting and saving relations");
			this.options.having.get(this.options.what).forEach(this.addToSelection, this);
			this.collection.forEach(this.addToOptions, this);
			jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
			    return function( elem ) {
			    	return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
			    };
			});
		},

		addToSelection: function (relation) {
			this.selection.push(relation.name);
		},

		addToOptions: function (dishElement) {
			this.posibilities.push(dishElement.get('name'));
		},

		events: {
			'click #save-modal' : 'save_clicked',
			'click #modal-element': 'button_clicked',
			'keyup #search-me': 'search_list'
		},

		search_list: function(ev) {
		    var filter = $('#search-me').val();
		    if (filter.length > 2) {
			    $('#dishesList').find("button:not(:Contains(" + filter + "))").parent().hide();
			    $('#dishesList').find("button:Contains(" + filter + ")").parent().show();
			} else {
				 $('#dishesList').find('button').parent().show();
			}
		},

		save_clicked: function(ev){
			this.selection.forEach(this.setObjectSelection, this);
			this.options.having.updateRelations(this.finalSelection);
		},

		setObjectSelection: function (dishSelected) {
			var currentElement = {};
			currentElement.name = dishSelected;
			var result = $.grep(this.collection.models, function(e){ 
				return e.get('name') == dishSelected; 
			});
			currentElement._id = result[0].get('_id');
			this.finalSelection.push(currentElement);
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
            	myCategos: this.posibilities,
            	myHaving: this.selection
        	});
			this.$el.html(compiledTemplate);
			return this;
		}
	});

	return ModalView;
})