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
    method: "GET"
}).then(function(response){
    console.log(response)
    image1.empty()
    image2.empty()
    image3.empty()
    console.log(response);
    var recipe = JSON.stringify(response.hits[0].recipe.label)
    var list = (response.hits[0].recipe.ingredientLines)
    var imageURL = (response.hits[0].recipe.image)
    var imageBox1 = $("<img src='" + imageURL + "'>'");
    image1.append(imageBox1)
    console.log(list)

    for (var i=0; i < list.length; i++) {
        var someingredient = $("<li>" + list[i] + "</li>")
        ingredients.append(someingredient)
    }
    
    recipeName.text(recipe)
    var recipe2 = JSON.stringify(response.hits[1].recipe.label)
    var list2 = (response.hits[1].recipe.ingredientLines)

    console.log(list2)
    for (var i=0; i < list2.length; i++) {
        var someingredient2 = $("<li>" + list2[i] + "</li>")
        ingredients2.append(someingredient2)}



    var imageURL2 = (response.hits[1].recipe.image)
    var linkURL2 = (response.hits[1].recipe.url)
    var source2 = $("<a href='" + linkURL2 + "'>")
    link2.append(source2)
    var imageBox2 = $("<img src='" + imageURL2 + "'>'");
    image2.append(imageBox2)
    
    recipeName2.text(recipe2)
    var recipe3 = JSON.stringify(response.hits[2].recipe.label)
    var list3 = (response.hits[2].recipe.ingredientLines)
    for (var i=0; i < list3.length; i++) {
        var someingredient2 = $("<li>" + list3[i] + "</li>")
        ingredients3.append(someingredient2)}

    var imageURL3 = (response.hits[2].recipe.image)
    var imageBox3 = $("<img src='" + imageURL3 + "'>'");
    image3.append(imageBox3)
    recipeName3.text(recipe3)
    
    

})})
