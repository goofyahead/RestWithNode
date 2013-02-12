
define(['backbone'], function(Backbone){
	
	var ModelErrorHanlder = Backbone.Model.extend({

		initialize: function () {
			this.on("error", this.errorHandler);
		},

		sync : function(method, model, options) {
            console.log('model sync called');
            options.beforeSend = function (xhr) {
			    xhr.setRequestHeader( 'Authorization' , sessionStorage.getItem('token') );
			};
            return Backbone.sync(method, model, options);
     	},

		errorHandler: function (model, error) {
			if (error.status == 401) {
				console.log('unauthorized for this resource.');
				Backbone.history.navigate('/login', true);
			}
		},
	});

	return ModelErrorHanlder;
});