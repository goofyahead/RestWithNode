// category model

define(['backbone','eventDispatcher','models/modelErrorHandler'], 
	function(Backbone, eventDispatcher, ModelErrorHandler){

	var Unasigned = ModelErrorHandler.extend({

		urlRoot: '/api/unasignedvideos',

		defaults: {
			elements : []
		}

	});
	
	return Unasigned;
});