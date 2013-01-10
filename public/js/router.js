//App router
define(['jquery','underscore','backbone','views/dishView','models/dish','views/dishListView', 'models/dishes'],
  function($, _, Backbone, DishView, Dish, DishListView, Dishes){
  
  var AppRouter = Backbone.Router.extend({
      
     // Hash maps for routes
     routes : {
        "" : "index",
        "dishes" : "showDishes",
        "dishes/:id" : "showDishById",
        "newDish" : "showNewDish",
        "error" : "fourOfour"
     },

     initialize: function(){
      //SET ALL LISTS MODELS,ETC.
     },
     
     index: function(){
         // Homepage 
     },

     showNewDish: function () {
        var dishModel = new Dish();
        var dishView = new DishView({model: dishModel});
        dishView.render();
        $('#content').html(dishView.el);
     },

     showDishById: function(id){
        console.log('requesting product' + id);
        var dishModel = new Dish({_id : id});
        dishModel.fetch({
            success: function() {
                console.log(dishModel.toJSON());
                var dishView = new DishView({model: dishModel});
                dishView.render();
                $('#content').html(dishView.el);
                console.log("rendering");
            },
            error: function(){
                    console.log('error retrieving data');
                    $('#content').html('<h1>ERROR AUTH</h1>');
            }
        });
     },

     showDishes: function(){
          var dishList = new Dishes();
          var dishListView = new DishListView({collection: dishList});
          dishList.fetch({
            success: function(){
              console.log('exito');
              console.log(dishList.toJSON());
            },
            error: function(){
              console.log('failure');
            }
          });
          
     },

     fourOfour: function(error) {
         // 404 page
     }
  });

  return AppRouter;
});
