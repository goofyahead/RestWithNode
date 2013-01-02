//App router
define(['jquery','underscore','backbone','views/dishView','models/dish','views/dishListView', 'models/dishList'],
  function($, _, Backbone, DishView, Dish, DishListView, DishList){
  
  var AppRouter = Backbone.Router.extend({
      
     // Hash maps for routes
     routes : {
        "" : "index",
        "dishes" : "showDishes",
        "dishes/:id" : "showDishById",
        "error" : "fourOfour"
     },

     initialize: function(){
      //SET ALL LISTS MODELS,ETC.
     },
     
     index: function(){
         // Homepage 
     },

     showDishById: function(id){
          console.log('requesting product' + id);
          var dishModel = new Dish({id : id});
          var dishView = new DishView({model: dishModel});
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
          var dishList = new DishList();
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
