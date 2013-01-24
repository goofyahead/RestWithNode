
define(['backbone','models/modelErrorHandler'], function (Backbone, ModelErrorHandler) {
	var User = ModelErrorHandler.extend({

		defaults: {
			userName : '',
			password : '',
			token : '',
			expiration : ''
		},

		url: 'api/login',

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
			});
		}
	});

	return User;
});