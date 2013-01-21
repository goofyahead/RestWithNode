
define(['backbone'], function (Backbone) {
	var User = Backbone.Model.extend({
		defaults: {
			userName : '',
			password : '',
			token : '',
			expiration : ''
		},

		url: 'api/login',

		saveUserAndPass: function (user, pass) {
			this.set({userName: user});
			this.set({password: pass});
			this.save({},{
					success: function() {
						// save token that will be on this element'0?????
						console.log(this.toJSON());
					}
			});
		}
	});

	return User;
});