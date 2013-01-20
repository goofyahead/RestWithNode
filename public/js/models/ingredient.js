// category menu

define(['backbone','eventDispatcher'], function(Backbone, eventDispatcher){

	var Ingredient = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: '/api/ingredients',

		defaults: {
			_id: null,
			name: "",
			description: "",
		},

		deleteMyself: function () {
			this.destroy();
			eventDispatcher.trigger('app:ingredientDestroyed');
		},

		updateBasicInfo: function (vName, vDescription) {
			var that = this; //refactor to a _this on the init
			var wasNew = this.isNew();
			this.set({name: vName});
			this.set({description: vDescription});
			this.save({},{
				success: function() {
					if (wasNew) {
						eventDispatcher.trigger('app:ingredientCreated');
						// navigate to the page of the newly added dish.
						Backbone.history.navigate('/ingredients/' + that.get('_id'));
					}
				}
			});
		}
	});

	return Ingredient;
});