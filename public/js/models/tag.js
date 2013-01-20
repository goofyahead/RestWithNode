// category menu

define(['backbone','eventDispatcher'], function(Backbone, eventDispatcher){

	var Tag = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/tags',

		defaults: {
			_id: null,
			name: "",
			description: "",
		},

		deleteMyself: function () {
			this.destroy();
			eventDispatcher.trigger('app:tagDestroyed');
		},

		updateBasicInfo: function (vName, vDescription) {
			var that = this; //refactor to a _this on the init
			var wasNew = this.isNew();
			this.set({name: vName});
			this.set({description: vDescription});
			this.save({},{
				success: function() {
					if (wasNew) {
						eventDispatcher.trigger('app:tagCreated');
						// navigate to the page of the newly added dish.
						Backbone.history.navigate('/tahs/' + that.get('_id'));
					}
				}
			});
		}
	});

	return Tag;
});