require.config({
    paths: {
        bootstrap: 'lib/bootstrap-min',
        underscore: 'lib/underscore-min',
        jquery: 'lib/jquery-1.8.2.min',
        backbone: 'lib/backbone-min',
        templates: '../templates'
    },
    shim: {
        'bootstrap': ['jquery'],
        'backbone': {
            deps:['underscore','jquery'],
            exports: 'Backbone'
        }
    }
});

require(['backbone','router'], function(Backbone, AppRouter){
    $(function(){
        router = new AppRouter();
        Backbone.history.start();
    });
});