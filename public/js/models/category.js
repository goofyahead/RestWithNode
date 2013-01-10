// category model

define(['backbone'], function(Backbone){

	var Category = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/categories'
	});

	return Category;
});