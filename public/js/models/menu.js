// category menu

define(['backbone','eventDispatcher','models/modelErrorHandler'], function(Backbone, eventDispatcher, ModelErrorHandler){

	var Menu = ModelErrorHandler.extend({
		idAttribute: "_id",
		urlRoot: '/api/menus',

		defaults: {
			_id: null,
			name: "",
			description: "",
			active: false
		},

		toggleActive: function () {
			if (this.get('active') == true) {
				this.set({active: false});
			} else {
				this.set({active: true});
			}
			this.save();
		},

		initialize: function () {
			this.on("error", this.errorHandler);
		},

		errorHandler: function (model, error) {
			console.log('error handled via events');
		},

		deleteMyself: function () {
			this.destroy();
			eventDispatcher.trigger('app:menuDestroyed');
		},

		updateBasicInfo: function (vName, vDescription) {
			var that = this; //refactor to a _this on the init
			var wasNew = this.isNew();
			this.set({name: vName});
			this.set({description: vDescription});
			this.save({},{
				success: function() {
					if (wasNew) {
						eventDispatcher.trigger('app:menuCreated');
						// navigate to the page of the newly added dish.
						Backbone.history.navigate('/menus/' + that.get('_id'));
					}
				}
			});
		}
	});

	return Menu;
});