// category menu

define(['backbone'], function(Backbone){

	var Tag = Backbone.Model.extend({
		urlRoot: '/api/tags'
	});

	return Tag;
});