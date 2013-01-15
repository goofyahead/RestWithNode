// category model

define(['backbone','eventDispatcher'], function(Backbone, eventDispatcher){

	var Category = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/categories',

	defaults: {
	        _id: null,
	        name: "",
	        description: "",
   	},

   	deleteMyself: function () {
   		this.destroy();
   		eventDispatcher.trigger('app:categoryDestroyed');
   	},

	updateBasicInfo: function (vName, vDescription) {
		var that = this;
		var wasNew = this.isNew();
		this.set({name: vName});
		this.set({description: vDescription});
		this.save({},{
			success: function() {
				if (wasNew) {
					eventDispatcher.trigger('app:categoryCreated');
					// navigate to the page of the newly added dish.
					Backbone.history.navigate('/categories/' + that.get('_id'));
				}
			}
		});
	}

	});

	return Category;
});