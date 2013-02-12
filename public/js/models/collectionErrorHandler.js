
define(['backbone'], function(Backbone){

	var CollectionErrorHandler = Backbone.Collection.extend({
	
		initialize: function () {
			this.on("error", this.errorHandler);
		},

		sync : function(method, collection, options) {
            console.log('collection sync called');
            options.beforeSend = function (xhr) {
			    xhr.setRequestHeader( 'Authorization' , sessionStorage.getItem('token') );
			};
            return Backbone.sync(method, collection, options);
     	},

		errorHandler: function (model, error) {
			if (error.status == 401) {
				console.log('unauthorized for this resource.');
				Backbone.history.navigate('/login', true);
			} else {
				console.log('unhandled error ' + error.status);
			}
		},
	});

	return CollectionErrorHandler;
});