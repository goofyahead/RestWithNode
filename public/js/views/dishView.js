// View definition importing its html for rendering

define(['backbone','jquery','text!templates/dish.html','views/modal','bootstrap','models/categories',
	'models/menus','models/tags','models/ingredients','models/dishes','views/modal_relations'],
	function(Backbone, $, dish, ModalView, bootstrap, Categories,
	 Menus, Tags, Ingredients, Dishes, ModalRelations){
	var DishView = Backbone.View.extend({
		template: _.template(dish),

		tagName: 'div',
		id: 'dish',

		initialize: function() {
			console.log('initializing dishView');
			this.model.on('change', this.render, this);
		},

		events: {
			'click #menus-menu .newItem': 'launch_modal_menu',
			'click #categories-menu .newItem': 'launch_modal_categories',
			'click #tags-menu .newItem': 'launch_modal_tags',
			'click #ingredients-menu .newItem': 'launch_modal_ingredients',
			'click #relations-menu .newItem': 'launch_modal_relations',
			'click #save-basic-changes': 'save_basic',
			'drop #dropPicture' : "dropHandler"
		},

		save_basic: function (event) {
			var name = $('#inputName').val();
			var description = $('#inputDescription').val();
			var price = $('#inputPrice').val();
			this.model.updateBasicInfo(name, description, price);
		},

		dropHandler: function(event) {
			console.log('drop received');
			event.stopPropagation();
	        event.preventDefault();

	        var e = event.originalEvent;
	        e.dataTransfer.dropEffect = 'copy';
	        this.pictureFile = e.dataTransfer.files[0];

	        // Read the image file from the local file system and display it in the img tag
	        var reader = new FileReader();
	        reader.onloadend = function () {
	            $('#dropPicture').attr('src', reader.result);
	        };
	        reader.readAsDataURL(this.pictureFile);

	        var thisView = this;
	        var fd = new FormData();
		    fd.append('uploadingFile', this.pictureFile);
		    fd.append('date', (new Date()).toString()); // req.body.date
		    fd.append('comment', 'This is a test.'); // req.body.comment
		    var xhr = new XMLHttpRequest();
		    xhr.upload.addEventListener('progress', this.uploadProgress, false);
		    xhr.addEventListener('load', uploadComplete, false);
		    xhr.addEventListener('error', this.uploadFailed, false);
		    xhr.addEventListener('abort', this.uploadCanceled, false);
		    xhr.open('POST', '/api/file-upload');
		    xhr.send(fd);

		    function uploadComplete(evt) {
				console.log(evt);
				var responseUpload = JSON.parse(evt.target.response);
				thisView.model.updatePicture(responseUpload.name);
			}
		},

		uploadProgress: function (evt) {
			console.log('progress');	
		},

		uploadFailed: function (evt) {
			alert('There was an error attempting to upload the file.');
		},

		uploadCanceled: function (evt) {
			alert('The upload has been canceled by the user or the browser dropped the connection.');
		},

		launch_modal_relations: function(ev){
			var thisView = this;
			var dishes = new Dishes();
			dishes.fetch({
	            success: function(){
					var modal = new ModalRelations(
						{collection: dishes,
						 having: thisView.model,
						 what: 'recommendations'
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });
		},

		launch_modal_ingredients: function(ev){
			var thisView = this;
			var ingredients = new Ingredients();
			ingredients.fetch({
	            success: function(){
					var modal = new ModalView(
						{collection: ingredients,
						 having: thisView.model,
						 what: 'ingredients'
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });	
		},

		launch_modal_tags: function(ev){
			var thisView = this;
			var tags = new Tags();
			tags.fetch({
	            success: function(){
					var modal = new ModalView(
						{collection: tags,
						 having: thisView.model,
						 what: 'tags'
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });	
		},

		launch_modal_menu: function(ev){
			var thisView = this;
			var menus = new Menus();
			menus.fetch({
	            success: function(){
					var modal = new ModalView(
						{collection: menus,
						 having: thisView.model,
						 what: 'menu'
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });	
		},

		launch_modal_categories: function(ev){
			var thisView = this;
			var categories = new Categories();
			categories.fetch({
	            success: function(){
					var modal = new ModalView(
						{collection: categories,
						 having: thisView.model,
						 what: 'categories'
					});
					modal.render();
					$('#modalplacer').html(modal.el);
					$('#myModal').modal();
	            },
	            error: function(){
	              console.log('failure');
	            }
		    });		
		},

		render: function(){
			console.log('rendering dishView');
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return DishView;
});