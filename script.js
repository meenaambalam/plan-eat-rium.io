var queryURL = "https://api.edamam.com/search?q=chicken&app_id=2ae93fb0&app_key=2438d9ac01f49f4467b8f7013aae8da6"	

var recipeName = $("#testme2")
var ingredients = $("#testme")
var recipeName2 = $("#testme3")
var ingredients2 = $("#testme4")
var recipeName3 = $("#testme5")
var ingredients3 = $("#testme6")



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    var recipe = JSON.stringify(response.hits[0].recipe.label)
    var list = JSON.stringify(response.hits[0].recipe.ingredientLines)
    console.log(list)
    ingredients.text(list)
    recipeName.text(recipe)
    var recipe2 = JSON.stringify(response.hits[1].recipe.label)
    var list2 = JSON.stringify(response.hits[1].recipe.ingredientLines)
    ingredients2.text(list2)
    recipeName2.text(recipe2)
    var recipe3 = JSON.stringify(response.hits[2].recipe.label)
    var list3 = JSON.stringify(response.hits[2].recipe.ingredientLines)
    ingredients3.text(list3)
    recipeName3.text(recipe3)
    






})