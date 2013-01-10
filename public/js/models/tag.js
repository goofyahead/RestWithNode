// category menu

define(['backbone'], function(Backbone){

	var Tag = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/tags'
	});

	return Tag;
});