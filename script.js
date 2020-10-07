$(document).ready(function () {
  var queryURL =
    "https://api.edamam.com/search?q=chicken+beef+corn&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6";
  //var queryURL = "https://api.edamam.com/search?q=" + searchcontenthere + "&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"

  var recipeName = $("#testme2");
  var ingredients = $("#testme");
  var recipeName2 = $("#testme3");
  var ingredients2 = $("#testme4");
  var recipeName3 = $("#testme5");
  var ingredients3 = $("#testme6");
  var image1 = $("#testme7");
  var image2 = $("#testme8");
  var image3 = $("#testme9");
  var link1 = $("testme10");
  var link2 = $("testme11");
  var link3 = $("testme12");

  var APIkey = "2438d9ac01f49f4467b8f7013aae8da6";

  //var searchBar = $("<li> <button id=\"tester\"class=\"btn btn-secondary\">" + citySearch.val() + "</button></li>")

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var recipe = JSON.stringify(response.hits[0].recipe.label);
    var list = response.hits[0].recipe.ingredientLines;
    var imageURL = response.hits[0].recipe.image;
    var imageBox1 = $("<img src='" + imageURL + "'>'");
    image1.append(imageBox1);
    console.log(list);

    for (var i = 0; i < list.length; i++) {
      var someingredient = $("<li>" + list[i] + "</li>");
      ingredients.append(someingredient);
    }

    recipeName.text(recipe);
    var recipe2 = JSON.stringify(response.hits[1].recipe.label);
    var list2 = response.hits[1].recipe.ingredientLines;

    console.log(list2);
    for (var i = 0; i < list2.length; i++) {
      var someingredient2 = $("<li>" + list2[i] + "</li>");
      ingredients2.append(someingredient2);
    }

    var imageURL2 = response.hits[1].recipe.image;
    var linkURL2 = response.hits[1].recipe.url;
    var source2 = $("<a href='" + linkURL2 + "'>");
    link2.append(source2);
    var imageBox2 = $("<img src='" + imageURL2 + "'>'");
    image2.append(imageBox2);

    recipeName2.text(recipe2);
    var recipe3 = JSON.stringify(response.hits[2].recipe.label);
    var list3 = response.hits[2].recipe.ingredientLines;
    for (var i = 0; i < list3.length; i++) {
      var someingredient2 = $("<li>" + list3[i] + "</li>");
      ingredients3.append(someingredient2);
    }

    var imageURL3 = response.hits[2].recipe.image;
    var imageBox3 = $("<img src='" + imageURL3 + "'>'");
    image3.append(imageBox3);
    recipeName3.text(recipe3);
  });

  // function to handle Recipe Button "Click" event
  $(".days").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var day = $(this).val();

    for (var i = 1; i < 4; i++) {
      var chkRecipe = '(".' + day + i + '")';
      if ($("." + day + i).text() === "Recipe Name") {
        $("." + day + i).removeClass("teal");
        $("." + day + i).addClass("blue");
        $("." + day + i).text("Recipe from Carousel");
        $("." + day + i).attr(
          "href",
          "https://www.epicurious.com/recipes/food/views/irish-channel-corned-beef-and-cabbage-51224220"
        );
        break;
      }
    }
  });

  //function to handle Delete Button "Click" event to clear the color, recipe name and href information

  $(".delBtn").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    var delBtnVal = $(this).val();
    $("#recipeBtn" + delBtnVal).text("Recipe Name");
    $("#recipeBtn" + delBtnVal).removeClass("blue");
    $("#recipeBtn" + delBtnVal).addClass("teal");
    $("#recipeBtn" + delBtnVal).attr("href", "#");
  });
});
//mealDB and APi key ~ 1

var mealURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"; //ingredients
var mealURLthree =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"; //list of instructions //str instructions
//www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview //this is for a preview image

//call to second API
https: $.ajax({
  url: mealURLthree,
  method: "GET",
}).then(function (responseTwo) {
  console.log(responseTwo);
});
////////////

//match recipes to calories //spoonacular api//=q=chicken&apiKey
var mealURLspoon =
  "https://api.spoonacular.com/recipes/chicken/information?=q=chicken&apiKey=571ff79b4eb14a0fbc553ed4db1d63c4&includeNutrition=true";
("https://api.spoonacular.com/recipes/chicken/information?=q=chicken&apiKey=571ff79b4eb14a0fbc553ed4db1d63c4&includeNutrition=true");

// "https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2";

// "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
https: var APIspoon = "571ff79b4eb14a0fbc553ed4db1d63c4";

https: $.ajax({
  url: mealURLspoon,
  method: "GET",
}).then(function (responseThree) {
  console.log(responseThree);
});
