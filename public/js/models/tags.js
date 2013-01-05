// menu collection definition

define(['backbone','models/tag'], function(Backbone, Tag){
	var Tags = Backbone.Collection.extend({
		model: Tag,
		url: 'api/tags'
	});

	return Tags;
});