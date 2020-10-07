// $(document).ready(function () {
    var queryURL = "https://api.edamam.com/search?q=chicken+beef+corn&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"
    //var queryURL = "https://api.edamam.com/search?q=" + searchcontenthere + "&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"	

    //not array but stored
    var recipeName = $("#recipeTitle");
    var ingredients = $("#recipeDescription");
    // var recipeName2 = $("#testme3")
    // var ingredients2 = $("#testme4")
    // var recipeName3 = $("#testme5")
    // var ingredients3 = $("#testme6")
    // var image1 = $("#testme7")
    // var image2 = $("#testme8")
    // var image3 = $("#testme9")
    // var link1 = $("testme10")
    // var link2 = $("testme11")
    // var link3 = $("testme12")

    var APIkey = "2438d9ac01f49f4467b8f7013aae8da6";
    //var searchBar = $("<li> <button id=\"tester\"class=\"btn btn-secondary\">" + citySearch.val() + "</button></li>")


    var carousel = document.querySelector(".carouselbox");
    var next = carousel.querySelector(".next");
    var prev = carousel.querySelector(".prev");
    // carousel.style.backgroundImage = "url('/cliparts/2/5/2/a/1516168956471372518recipe-book-clipart-free.med.png')";
    var index = 0;
    var recipeNames = [];
    var lists = [];
    var images = [];
    var links = [];
    var currentImage;
    var currentLink;
    //looping function
    function navigate(direction) {
        index = index + direction;
        if (index < 0) {
            index = images.length - 1;
        } else if (index > images.length - 1) {
            index = 0;
        }
        currentImage = images[index];
        carousel.style.backgroundImage = "url('" + currentImage + "')";
        recipeName.text(recipeNames[index]);
        currentLink = links[index];
        for (var i = 0; i < lists[index].length; i++) {
            var someingredient = $("<li>" + lists[i] + "</li>");
            ingredients.append(someingredient);
        }
    }
    //looping function
    next.onclick = function (event) {
        event.stopPropagation();
        navigate(1);
    };

    prev.addEventListener("click", function (event) {
        event.stopPropagation();
        navigate(-1);
    });
    //set the first image?
    navigate(0);

    // call
    $.ajax({
        url: queryURL,
        method: "GET"
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
        var source1 = $("<a href='" + linkURL1 + "'>");

        console.log(list1);
        //append
        // for (var i = 0; i < list1.length; i++) {
        //     var someingredient = $("<li>" + list[i] + "</li>");
        //     ingredients.append(someingredient);
        // }
        // recipeName1.text(recipe1);
        // image1.append(imageBox1);
        // link1.append(source1);

        var recipe2 = JSON.stringify(response.hits[1].recipe.label);
        var list2 = (response.hits[1].recipe.ingredientLines);
        var imageURL2 = (response.hits[1].recipe.image);

        var linkURL2 = (response.hits[1].recipe.url);
        var source2 = $("<a href='" + linkURL2 + "'>");

        console.log(list2);
        //append
        // for (var i = 0; i < list2.length; i++) {
        //     var someingredient2 = $("<li>" + list2[i] + "</li>");
        //     ingredients2.append(someingredient2);
        // }
        // image2.append(imageBox2);
        // recipeName2.text(recipe2);
        // link2.append(source2);

        var recipe3 = JSON.stringify(response.hits[2].recipe.label);
        var list3 = (response.hits[2].recipe.ingredientLines);
        var imageURL3 = (response.hits[2].recipe.image);

        var linkURL3 = (response.hits[1].recipe.url);
        var source3 = $("<a href='" + linkURL3 + "'>");

        console.log(list3);
        //append
        // for (var i = 0; i < list3.length; i++) {
        //     var someingredient2 = $("<li>" + list3[i] + "</li>");
        //     ingredients3.append(someingredient2);
        // }
        // image3.append(imageBox3);
        // recipeName3.text(recipe3);    
        // link3.append(source3);

        // puts search vars into storage arrays
        for (var v = 1; v < 4; v++) {
            var w = v - 1;
            recipeNames[w] = (recipe + v);
            lists[w] = (list + v);
            images[w] = (imageURL + v);
            links[w] = (source + v);
        }
    });

    // function to handle Recipe Button "Click" event
    $(".days").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var day = $(this).val();

        for (var i = 1; i < 4; i++) {
            var chkRecipe = '(".' + day + i + '")';
            if ($('.' + day + i).text() === "Recipe Name") {
                $('.' + day + i).removeClass("teal");
                $('.' + day + i).addClass("blue");
                $('.' + day + i).text("Recipe from Carousel");
                $('.' + day + i).attr("href", "https://www.epicurious.com/recipes/food/views/irish-channel-corned-beef-and-cabbage-51224220");
                break;
            }
        }

    })

    //function to handle Delete Button "Click" event to clear the color, recipe name and href information

    $(".delBtn").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var delBtnVal = $(this).val();
        $('#recipeBtn' + delBtnVal).text("Recipe Name");
        $('#recipeBtn' + delBtnVal).removeClass("blue");
        $('#recipeBtn' + delBtnVal).addClass("teal");
        $('#recipeBtn' + delBtnVal).attr("href", "#");

    })
