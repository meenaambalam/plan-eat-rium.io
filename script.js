$(document).ready(function(){

var recipeName = $("#testme2")
var ingredients = $("#testme")
var recipeName2 = $("#testme3")
var ingredients2 = $("#testme4")
var recipeName3 = $("#testme5")
var ingredients3 = $("#testme6")
var image1 = $("#testme7")
var image2 = $("#testme8")
var image3 = $("#testme9")
var link1 = $("testme10")
var link2 = $("testme11")
var link3 = $("testme12")
var search1 = $("#Ingredient1")
var search2 = $("#Ingredient2")
var search3 = $("#Ingredient3")

var APIkey = "2438d9ac01f49f4467b8f7013aae8da6"

$("#search-recipes").on("click", 

function runSearch() {

var queryURL = "https://api.edamam.com/search?q=" + search1.val().trim() + "+" + search2.val().trim() + "+" + search3.val().trim() + "&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"	

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

})
/**** Meena's changes for the calendar recipe planner ***/



    //function to save the new added recipe in LocalStorage
    function saveRecipe_LocalStorage(carouselRecipeName, carouselRecipeLink, btnValue){
        var saveRecipeDetails = {
            recipeName : carouselRecipeName,
            recipeLink : carouselRecipeLink
        }
        var saveRecipeDynamicVar = "saveRecipeInfo" + btnValue;
        localStorage.setItem(saveRecipeDynamicVar, JSON.stringify(saveRecipeDetails));
    }

    //function to save the new added recipe in LocalStorage
    function delRecipe_LocalStorage(delBtnVal){
        alert("delBtnVa: " + delBtnVal);
        var delRecipeDynamicVar = "saveRecipeInfo" + delBtnVal;
        localStorage.removeItem(delRecipeDynamicVar);
    }

    // function to handle Recipe Button "Click" event
    $(".days").on("click", function(event){
        event.preventDefault();
        event.stopPropagation();
        var day = $(this).val(); //containes mon/tue/wed/thu/fri/sat/sun depending on which day button was clicked
        
        //dynamically loop through the 3 recipe buttons on the day the user selected
        //if the recipe name is still the placeholder name, then that would be a good button to add the new recipe name from the carousel
        for (var i = 1; i < 4; i++) {
            var carouselRecipeName = "Recipe from Carousel";
            var carouselRecipeLink = "https://www.epicurious.com/recipes/food/views/irish-channel-corned-beef-and-cabbage-51224220";
            if ($('.' + day + i).text() === "Recipe Name"){
                $('.' + day + i).removeClass("teal");
                $('.' + day + i).addClass("blue");
                $('.' + day + i).text(carouselRecipeName);
                $('.' + day + i).attr("href", carouselRecipeLink);
                btnValue = $('.' + day + i).attr("value");
                console.log("recipeBtnValue", btnValue);

                saveRecipe_LocalStorage(carouselRecipeName, carouselRecipeLink, btnValue);
                break;
            }
        } 
    })

    //function to handle Delete Button "Click" event to clear the color, recipe name and href information

    $(".delBtn").on("click", function(event){
        event.preventDefault();
        event.stopPropagation();

        var delBtnVal = $(this).val();
        $("#recipeBtn"+delBtnVal).text("Recipe Name");
        $("#recipeBtn"+delBtnVal).removeClass("blue");
        $("#recipeBtn"+delBtnVal).addClass("teal");
        $("#recipeBtn"+delBtnVal).attr("href","#");

        delRecipe_LocalStorage(delBtnVal);

    })

    //On the load of the browser, pull the recipe information saved in local storage and display according to the specifications
    function run_onload(){

        for (let i = 1; i < 21; i++) {
            var recipeBtn = "saveRecipeInfo" + i;

            if (localStorage.getItem(recipeBtn) !== null) {
                var savedRecipeInfo = JSON.parse(localStorage.getItem(recipeBtn));
                $("#recipeBtn" + i).text(savedRecipeInfo.recipeName);
                $("#recipeBtn" + i).addClass("blue");
                $("#recipeBtn" + i).removeClass("teal");
                $("#recipeBtn" + i).attr("href", savedRecipeInfo.recipeLink);
            }  
        }
    }

    run_onload();
})
