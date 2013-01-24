
define(['backbone'], function(Backbone){

	var CollectionErrorHandler = Backbone.Collection.extend({
	
		initialize: function () {
			this.on("error", this.errorHandler);
		},

		errorHandler: function (model, error) {
			if (error.status == 401) {
				console.log('unauthorized for this resource.');
				Backbone.history.navigate('/login', true);
			}
		},
	});

	return CollectionErrorHandler;
});