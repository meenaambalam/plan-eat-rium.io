$(document).ready(function () {

    // carousel.style.backgroundImage = "url('')";
    var index = 0;
    var recipeNames = [];
    var lists = [];
    var images = [];
    var links = [];
    var currentImage;
    var currentLink;
    var currentName = $("#recipeName");
    var search1 = $("#Ingredient1");
	var search2 = $("#Ingredient2");
	var search3 = $("#Ingredient3");
  	//not array but stored
    var recipeName = $("#recipeTitle");
    var ingredients = $("#recipeDescription");

    //looping function
    function navigate(direction) {
        index = index + direction;
        if (index < 0) {
            index = 3;
        } else if (index > 3) {
            index = 0;
        }

        currentImage = images[index];
        $(".carouselbox").attr("src", currentImage);
        currentName = recipeNames[index];
        recipeName.text(currentName);
        currentLink = links[index];
        $("#recipeDescription").empty();
        $(document).ready(function () {
            for (var i = 0; i < lists[index].length; i++) {
                var someingredient = $("<li>" + lists[index][i] + "</li>");
                ingredients.append(someingredient);
            }
        });
    }

    //nav button functionality
    $(".next").on("click", function (event) {
        event.stopPropagation();
        navigate(1);
    });

    $(".prev").on("click", function (event) {
        event.stopPropagation();
        navigate(-1);
    });

    $("#search-recipes").on("click",

        function runSearch() {

            var queryURL = "https://api.edamam.com/search?q=" + search1.val().trim() + "+" + search2.val().trim() + "+" + search3.val().trim() + "&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                // empty the arrays
                recipeNames = [];
                lists = [];
                images = [];
                links = [];

                var recipe1 = JSON.stringify(response.hits[0].recipe.label);
                var list1 = (response.hits[0].recipe.ingredientLines);
                var imageURL1 = (response.hits[0].recipe.image);
                var linkURL1 = (response.hits[0].recipe.url);
                var recipe2 = JSON.stringify(response.hits[1].recipe.label);
                var list2 = (response.hits[1].recipe.ingredientLines);
                var imageURL2 = (response.hits[1].recipe.image);
                var linkURL2 = (response.hits[1].recipe.url);
                var recipe3 = JSON.stringify(response.hits[2].recipe.label);
                var list3 = (response.hits[2].recipe.ingredientLines);
                var imageURL3 = (response.hits[2].recipe.image);
                var linkURL3 = (response.hits[2].recipe.url);
                var list4 = (response.hits[4].recipe.ingredientLines);
                var linkURL4 = (response.hits[4].recipe.url);


              
                //set the first image?
            

        

    //match recipes to calories //spoonacular api//=q=chicken&apiKey

    var spoonURL =
      "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
      search1.val().trim() +
      ",+" +
      search2.val().trim() +
      ",+" +
      search3.val().trim() +
      "&apiKey=571ff79b4eb14a0fbc553ed4db1d63c4";


    $.ajax({
      url: spoonURL,
      method: "GET",
    }).then(function (responseThree) {
        
      var imgSpoon = responseThree[5].image;
      var titleSpoon = JSON.stringify(responseThree[5].title);
      recipeNames = [recipe1, recipe2, recipe3, titleSpoon];
      lists = [list1, list2, list3, list4];
      images = [imageURL1, imageURL2, imageURL3, imgSpoon];
      links = [linkURL1, linkURL2, linkURL3, linkURL4];
        console.log(recipeNames)
        navigate(0);

      //images.append(imgSpoon)
    });})})
  
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
            var carouselRecipeName = currentName;
            var buttonRecipeName = currentName.substring(0, 20);
            var carouselRecipeLink = currentLink;
            if ($('.' + day + i).text() === "Recipe Name"){
                $('.' + day + i).removeClass("teal");
                $('.' + day + i).addClass("blue");
                $('.' + day + i).text(buttonRecipeName);
                $('.' + day + i).attr("href", carouselRecipeLink);
                btnValue = $('.' + day + i).attr("value");

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