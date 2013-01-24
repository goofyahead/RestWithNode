//Model representing the dish state.

define(['backbone','eventDispatcher'], function(Backbone, eventDispatcher){
	
	var Dish = Backbone.Model.extend({

		urlRoot: '/api/dishes',
		
		idAttribute: "_id",

		defaults: {
	        _id: null,
	        name: '',
	        description: '',
	        price: '',
	        picture: null,
	        categories: [],
	        recommendations: [],
	        tags: [],
	        ingredients: [],
	        menu: [],
	        thumbnail: '',
	        video: null,
	        demo: false,
    	},

    	toggleDemo: function () {
    		if (this.get('demo') == false) {
    			this.set({demo: true});
    		} else {
    			this.set({demo: false});
    		}
    		this.save({},{
    			success: function() {
					console.log('saved correctly');
				},
				error: function (model, response) {
					console.log('error login' + response.responseText);
				}
			});
    	},

    	deleteMyself: function () {
	   		this.destroy();
	   		eventDispatcher.trigger('app:dishDestroyed');
   		},

   		updateVideo: function ( mVideo, mThumbnail ){
   			this.set({video: mVideo});
   			this.set({thumbnail: mThumbnail});
   			this.save();
   		},

		updateFields: function ( what, updates  ){
			console.log('updating model ' + what + ' with: ' + updates);
			this.set(what, updates);
			this.save();
			this.trigger('change');
		},

		updateBasicInfo: function ( vName, vDescription, vPrice) {
			var that = this;
			var wasNew = this.isNew();
			this.set({name: vName});
			this.set({description: vDescription});
			this.set({price: vPrice});
			this.save({},{
				headers: {'Authorization' : sessionStorage.getItem('token')},
				success: function() {
					if (wasNew) {
						eventDispatcher.trigger('app:dishCreated');
						// navigate to the page of the newly added dish.
						Backbone.history.navigate('/dishes/' + that.get('_id'));
					}
				},
				error: function (model, response) {
					console.log('error login' + response.responseText);
				}
			});
		},

		updateRelations: function (relations) {
			this.set({recommendations: relations});
			this.save();
			this.trigger('change');
		},

		updatePicture: function  (newPicture) {
			this.set({picture: newPicture});
			this.save();
		}
	});

	return Dish;
});