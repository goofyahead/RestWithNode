//App router
define(['jquery','underscore','backbone','views/dishView','models/dish','views/dishListView'
  , 'models/dishes', 'models/categories','views/categoriesListView', 'models/category', 'views/categoryView'],
  function($, _, Backbone, DishView, Dish, DishListView, Dishes, 
    Categories, CategoriesListView, Category, CategoryView){

    var AppRouter = Backbone.Router.extend({

     // Hash maps for routes
     routes : {
      "" : "index",
      "dishes" : "showDishes",
      "dishes/:id" : "showDishById",
      "newDish" : "showNewDish",
      "categories" : "showCategories",
      "categories/newCategory" : "showNewCategory",
      "categories/:id" : "showCategoryById",        
      "error" : "fourOfour"
    },

    initialize: function(){
      //SET ALL LISTS MODELS,ETC.
    },

    index: function(){
      $('.nav li').removeClass('active');
      $('#home-link').addClass('active');
      $('#content').empty();
    },

    showNewCategory: function() {
      $('.nav li').removeClass('active');
      $('#categories-link').addClass('active');
      var category = new Category();
      var categoryView = new CategoryView({model : category});
      categoryView.render();
      $('#content').html(categoryView.el);
    },

    showCategories: function () {
      $('.nav li').removeClass('active');
      $('#categories-link').addClass('active');
      var categories = new Categories();
      var categoriesList = new CategoriesListView ({collection: categories});
      categories.fetch();
    },

    showCategoryById: function(id) {
     $('.nav li').removeClass('active');
     $('#categories-link').addClass('active');
     var category = new Category({_id : id});
     var categoryView = new CategoryView({model : category});
     category.fetch({
      success : function() {
        categoryView.render();
        $('#content').html(categoryView.el);
      },
      error: function() {

      }
    });
   },

   showNewDish: function () {
    $('.nav li').removeClass('active');
    $('#dishes-link').addClass('active');
    var dishModel = new Dish();
    var dishView = new DishView({model: dishModel});
    dishView.render();
    $('#content').html(dishView.el);
  },

  showDishById: function(id){
    $('.nav li').removeClass('active');
    $('#dishes-link').addClass('active');
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
    $('.nav li').removeClass('active');
    $('#dishes-link').addClass('active');
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
