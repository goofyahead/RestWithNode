
define(['backbone','models/modelErrorHandler'], 
	function (Backbone, ModelErrorHandler) {
	var User = Backbone.Model.extend({

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
					console.log(that.toJSON());
					sessionStorage.setItem('token',that.get('token'));
					Backbone.history.navigate('/#dishes', true);
				},
				error: function() {
					sessionStorage.setItem('token','none');
				}
			});
		}
	});

	return User;
});