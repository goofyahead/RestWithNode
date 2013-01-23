
define(['backbone'], function (Backbone) {
	var User = Backbone.Model.extend({

		defaults: {
			userName : '',
			password : '',
			token : '',
			expiration : ''
		},

		initialize: function () {
			this.on("error", this.errorHandler);
		},

		url: 'api/login',

		errorHandler: function(model, error) {
			console.log('error handled via event');
			if (error.status == 403) {
				console.log('unauthorized');
			}
		},

		saveUserAndPass: function (user, pass) {
			var that = this;
			this.set({userName: user});
			this.set({password: pass});
			this.save({},{
					success: function() {
						// save token that will be on this element'0?????
						console.log(that.toJSON());
						sessionStorage.setItem('token',that.get('token'));
					}
					// error: function(model, error) {
					// 	if (error.status == 403) {
					// 		console.log('unauthorized');
					// 	}
					// 	console.log('error' + error.toJSON());
					// }
			});
		}
	});

	return User;
});