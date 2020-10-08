$(document).ready(function () {

    // carousel.style.backgroundImage = "url('')";
    var index = 0;
    var recipeNames = [];
    var lists = [];
    var images = [];
    var links = [];
    var currentImage;
    var currentLink;
    var currentName;
    //not array but stored
    var recipeName = $("#recipeTitle");
    var ingredients = $("#recipeDescription");

    var carousel = document.querySelector(".carouselbox");

    //looping function
    function navigate(direction) {
        index = index + direction;
        console.log(index);
        if (index < 0) {
            index = 2;
        } else if (index > 2) {
            index = 0;
        }

        currentImage = images[index];
        console.log(currentImage);
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

    var APIkey = "2438d9ac01f49f4467b8f7013aae8da6"

    $("#search-recipes").on("click",

        function runSearch() {

            var queryURL = "https://api.edamam.com/search?q=" + search1.val().trim() + "+" + search2.val().trim() + "+" + search3.val().trim() + "&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                // empty the arrays
                recipeNames = [];
                lists = [];
                images = [];
                links = [];

                var recipe1 = JSON.stringify(response.hits[0].recipe.label);
                var list1 = (response.hits[0].recipe.ingredientLines);
                var imageURL1 = (response.hits[0].recipe.image);
                var linkURL1 = (response.hits[1].recipe.url);

                console.log(recipe1);
                console.log(list1);
                console.log(imageURL1);

                var recipe2 = JSON.stringify(response.hits[1].recipe.label);
                var list2 = (response.hits[1].recipe.ingredientLines);
                var imageURL2 = (response.hits[1].recipe.image);
                var linkURL2 = (response.hits[1].recipe.url);

                console.log(recipe2);
                console.log(list2);
                console.log(imageURL2);

                var recipe3 = JSON.stringify(response.hits[2].recipe.label);
                var list3 = (response.hits[2].recipe.ingredientLines);
                var imageURL3 = (response.hits[2].recipe.image);
                var linkURL3 = (response.hits[1].recipe.url);

                console.log(recipe3);
                console.log(list3);
                console.log(imageURL3);

                recipeNames = [recipe1, recipe2, recipe3];
                lists = [list1, list2, list3];
                images = [imageURL1, imageURL2, imageURL3];
                links = [linkURL1, linkURL2, linkURL3];

                console.log("storage array info");
                console.log(recipeNames);
                console.log(lists);
                console.log(images);

                //set the first image?
                navigate(0);
            });

        })
    /**** Meena's changes for the calendar recipe planner ***/

    //function to save the new added recipe in LocalStorage
    function saveRecipe_LocalStorage(carouselRecipeName, carouselRecipeLink, btnValue) {
        var saveRecipeDetails = {
            recipeName: carouselRecipeName,
            recipeLink: carouselRecipeLink
        }
        var saveRecipeDynamicVar = "saveRecipeInfo" + btnValue;
        localStorage.setItem(saveRecipeDynamicVar, JSON.stringify(saveRecipeDetails));
    }

    //function to save the new added recipe in LocalStorage
    function delRecipe_LocalStorage(delBtnVal) {
        alert("delBtnVa: " + delBtnVal);
        var delRecipeDynamicVar = "saveRecipeInfo" + delBtnVal;
        localStorage.removeItem(delRecipeDynamicVar);
    }

    // function to handle Recipe Button "Click" event
    $(".days").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var day = $(this).val(); //containes mon/tue/wed/thu/fri/sat/sun depending on which day button was clicked

        //dynamically loop through the 3 recipe buttons on the day the user selected
        //if the recipe name is still the placeholder name, then that would be a good button to add the new recipe name from the carousel
        for (var i = 1; i < 4; i++) {
            var carouselRecipeName = "Recipe from Carousel";
            var carouselRecipeLink = "https://www.epicurious.com/recipes/food/views/irish-channel-corned-beef-and-cabbage-51224220";
            if ($('.' + day + i).text() === "Recipe Name") {
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

    var delBtnVal = $(this).val();
    $("#recipeBtn" + delBtnVal).text("Recipe Name");
    $("#recipeBtn" + delBtnVal).removeClass("blue");
    $("#recipeBtn" + delBtnVal).addClass("teal");
    $("#recipeBtn" + delBtnVal).attr("href", "#");

    delRecipe_LocalStorage(delBtnVal);

    //On the load of the browser, pull the recipe information saved in local storage and display according to the specifications
    function run_onload() {

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
