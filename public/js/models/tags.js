// menu collection definition

define(['backbone','models/tag', 'models/collectionErrorHandler'], function(Backbone, Tag, CollectionErrorHandler){
	
	var Tags = CollectionErrorHandler.extend({
		model: Tag,
		url: 'api/tags'
	});

	return Tags;
});