
define(['backbone'], function(Backbone){
	var CollectionErrorHandler = Backbone.Collection.extend({
	
		initialize: function () {
			this.on("error", this.errorHandler);
		},

		errorHandler: function (model, error) {
			console.log('error handled via events');
			Backbone.history.navigate('/login', true);
		},
	});

	return CollectionErrorHandler;
});