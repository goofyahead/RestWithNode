// ListView of categories for a list on the left side.
define(['backbone','text!templates/basicList.html', 'text!templates/blueButton.html',
	'eventDispatcher'],
 function(Backbone, myTemplate, myBlueTemplate, eventDispatcher){

	var TagsListView = Backbone.View.extend({
		//attach to an existing element
		el: $('#left_menu'),
		template: _.template(myTemplate),
		buttonTemplate: _.template(myBlueTemplate),

		initialize: function(){
			this.collection.on('reset', this.addAll, this);
			eventDispatcher.on('app:tagCreated', this.reload, this);
			eventDispatcher.on('app:tagDestroyed', this.reload, this);
		},

		reload: function() {
			console.log('reloading list');
			this.collection.fetch();
		},

		render: function() {
			this.addAll();
		},

		addAll: function() {
			console.log (this.collection.toJSON());
			$('#left_menu').empty();
			var compiledTemplate = this.template({
            	elements: this.collection.toJSON(),
            	url_base: 'tags',
            	header: 'Lista de tags'
        	});
			$('#left_menu').append(compiledTemplate);
			var compiledButton = this.buttonTemplate({
            	action: '#tags/newTag',
            	textButton: 'nuevo tag'
        	});
        	$('#left_menu').append(compiledButton);
		}
	});

	return TagsListView;
});