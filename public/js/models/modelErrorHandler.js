
define(['backbone'], function(Backbone){
	
	var ModelErrorHanlder = Backbone.Model.extend({
	
		initialize: function () {
			this.on("error", this.errorHandler);
		},

		errorHandler: function (model, error) {
			if (error.status == 403) {
				console.log('unauthorized for this resource.');
				Backbone.history.navigate('/login', true);
			}
		},
	});

	return ModelErrorHanlder;
});