//App router
define(['jquery','underscore','backbone','views/dishView','models/dish','views/dishListView', 
  'models/dishes', 'models/categories','views/categoriesListView', 'models/category', 'views/categoryView',
  'models/menus', 'views/menuListView', 'views/menuView', 'models/menu','models/ingredient','models/tag',
  'models/ingredients', 'models/tags','views/tagView', 'views/ingredientView', 'views/tagListView',
  'views/ingredientsListView', 'models/user','views/userView', 'models/unasigned', 'views/unasignedView'],
  function($, _, Backbone, DishView, Dish, DishListView, Dishes,
    Categories, CategoriesListView, Category, CategoryView, Menus,
    MenusListView, MenuView, Menu, Ingredient, Tag, Ingredients, Tags,
    TagView, IngredientView, TagsListView, IngredientsListView, User, 
    UserView, Unasigned, UnasignedView) {



    var AppRouter = Backbone.Router.extend({

     // Hash maps for routes
     routes : {
      "" : "index",
      "login" : "logIn",
      "dishes" : "showDishes",
      "dishes/:id" : "showDishById",
      "newDish" : "showNewDish",
      "categories" : "showCategories",
      "categories/newCategory" : "showNewCategory",
      "categories/:id" : "showCategoryById",
      "menus" : "showMenus",
      "menus/newMenu" : "showNewMenu",
      "menus/:id" : "showMenuById",
      "tags" : "showTags",
      "tags/newTag" : "showNewTag",
      "tags/:id" : "showTagById",
      "ingredients" : "showIngredients",
      "ingredients/newIngredient" : "showNewIngredient",
      "ingredients/:id" : "showIngredientById",
      "unasigned" : "unasigned",
      "*error" : "fourOfour"
    },

    initialize: function() {
      //SET ALL LISTS MODELS,ETC.
    },

    index: function() {
      console.log("index called");
      $('.nav li').removeClass('active');
      $('#home-link').addClass('active');
    },

    unasigned : function() {
      $('.nav li').removeClass('active');
      $('#unasigned').addClass('active');
      var unasigned = new Unasigned();
      unasigned.fetch();

      var unasignedView = new UnasignedView ({model : unasigned});
      unasignedView.render();
      $('#menu_holder').hide();
      $('#content').html(unasignedView.el);
    },

    logIn: function() {
      $('#menu_holder').hide();
      $('#left_menu').empty();
      var user = new User();
      var userView = new UserView({model: user});
      userView.render();
      $('#content').html(userView.el);
    },

    showTags: function() {
      $('#menu_holder').show();
      $('#content').empty();
      $('.nav li').removeClass('active');
      $('#tags-link').addClass('active');
      var tags = new Tags();
      var tagsListView = new TagsListView({collection: tags});
      tags.fetch();
    },

    showNewTag: function() {
     $('#menu_holder').show();
     $('.nav li').removeClass('active');
     $('#tags-link').addClass('active');
     var tag = new Tag();
     var tagView = new TagView({model: tag});
     tagView.render();
     $('#content').html(tagView.el);
   },

   showTagById: function(id) {
    $('#menu_holder').show();
    $('.nav li').removeClass('active');
    $('#tags-link').addClass('active');
    var tag = new Tag({_id : id});
    var tagView = new TagView({model: tag});
    tag.fetch({
      success: function () {
        tagView.render();
        $('#content').html(tagView.el);
      }
    });
  },

  showIngredients: function() {
    $('#menu_holder').show();
    $('#content').empty();
    $('.nav li').removeClass('active');
    $('#ingredients-link').addClass('active');
    var ingredients = new Ingredients();
    var ingredientsListView = new IngredientsListView({collection: ingredients});
    ingredients.fetch();
  },

  showNewIngredient: function() {
    $('#menu_holder').show();
   $('.nav li').removeClass('active');
   $('#ingredients-link').addClass('active');
   var ingredient = new Ingredient();
   var ingredientView = new IngredientView({model: ingredient});
   ingredientView.render();
   $('#content').html(ingredientView.el);
 },

 showIngredientById: function(id) {
  $('#menu_holder').show();
  $('.nav li').removeClass('active');
  $('#ingredient-link').addClass('active');
  var ingredient = new Ingredient({_id : id});
  var ingredientView = new IngredientView({model: ingredient});
  ingredient.fetch({
    success: function () {
      ingredientView.render();
      $('#content').html(ingredientView.el);
    }
  });
},

showMenus: function() {
  $('#menu_holder').show();
  $('#content').empty();
  $('.nav li').removeClass('active');
  $('#menu-link').addClass('active');
  var menus = new Menus();
  var menusListView = new MenusListView({collection: menus});
  menus.fetch();
},

showNewMenu: function() {
  $('#menu_holder').show();
 $('.nav li').removeClass('active');
 $('#menu-link').addClass('active');
 var menu = new Menu();
 var menuView = new MenuView({model: menu});
 menuView.render();
 $('#content').html(menuView.el);
},

showMenuById: function(id) {
  $('#menu_holder').show();
  $('.nav li').removeClass('active');
  $('#menu-link').addClass('active');
  var menu = new Menu({_id : id});
  var menuView = new MenuView({model: menu});
  menu.fetch({
    success: function () {
      menuView.render();
      $('#content').html(menuView.el);
    }
  });
},

showNewCategory: function() {
  $('#menu_holder').show();
  $('.nav li').removeClass('active');
  $('#categories-link').addClass('active');
  var category = new Category();
  var categoryView = new CategoryView({model : category});
  categoryView.render();
  $('#content').html(categoryView.el);
},

showCategories: function () {
  $('#menu_holder').show();
  $('#content').empty();
  $('.nav li').removeClass('active');
  $('#categories-link').addClass('active');
  var categories = new Categories();
  var categoriesList = new CategoriesListView ({collection: categories});
  categories.fetch();
},

showCategoryById: function(id) {
  $('#menu_holder').show();
 $('.nav li').removeClass('active');
 $('#categories-link').addClass('active');
 var category = new Category({_id : id});
 var categoryView = new CategoryView({model : category});
 category.fetch({
  success : function() {
    categoryView.render();
    $('#content').html(categoryView.el);
  }
});
},

showNewDish: function () {
  $('#menu_holder').show();
  $('.nav li').removeClass('active');
  $('#dishes-link').addClass('active');
  var dishModel = new Dish();
  var dishView = new DishView({model: dishModel});
  dishView.render();
  $('#content').html(dishView.el);
},

showDishById: function(id){
  $('#menu_holder').show();
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
    }
  });
},

showDishes: function(){
  $('#menu_holder').show();
  $('#content').empty();
  $('.nav li').removeClass('active');
  $('#dishes-link').addClass('active');
  var dishList = new Dishes();
  var dishListView = new DishListView({collection: dishList});
  dishList.fetch();
},

fourOfour: function(error) {
  $('#content').html('page does not exists');
}
});

return AppRouter;
});
