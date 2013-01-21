
define(['backbone','text!templates/login.html'], function (Backbone, template){

	var UserView = Backbone.View.extend({
		template: _.template(template),
		id: 'user',

		initialize: function() {
		},

		events: {
			'click #login' : 'login'
		},

		login: function(event) {
			console.log('login clicked!');
			var user = $('#inputUserName').val();
			var pass = $('#inputUserPass').val();
			this.model.saveUserAndPass(user, pass);
		},

		render: function() {
			this.$el.html(this.template);
		}
	});

	return UserView;
});