let recipeCard = document.querySelector('.recipe-card')
 let recipeName = document.querySelector('.recipe-name')
 let recipeImg= document.querySelector('.recipe-img')
 let category = document.querySelector('.category')
 let ingredientContainer= document.querySelector('.ingredients-container')
 let ingredient = document.querySelector('.ingredient')
 let ingredientName = document.querySelector('.ingredient-name')
 let ingredientMeasure = document.querySelector('.ingredient-measure')
let recipePic = document.querySelector('.recipe-pic')
//  let recipe = document.querySelector(".recipe")
 let recipeMethod = document.querySelector(".recipe-method")

 let subCat1 = document.querySelector('.sub-cat1')
 let subCat2 = document.querySelector('.sub-cat2')
 let subCat3 = document.querySelector('.sub-cat3')

 let backBtn = document.querySelector('.back-btn')
 let addFavBtn = document.querySelector('.favorite-btn')

let selectedRecipeId = localStorage.selectedRecipeId
console.log("recipe id---------")
console.log(selectedRecipeId)
console.log(typeof selectedRecipeId)

async function recipeFuction(selectedRecipeId) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipeId}`)
     let data = await response.json()
     
     let  recipe = data.meals[0]

     
     let subCat = [recipe.strArea,recipe.strCategory,recipe.strCountry]
     console.log("---------------subcat----")
     console.log(subCat)

      console.log(recipe)
      recipeName.textContent = recipe.strMeal    
      recipePic.src = recipe.strMealThumb

      if(recipe.strCategory == " "){
        subCat1.classList.add('hidden')
      }else{
        subCat1.textContent = recipe.strCategory
      }

      if(recipe.strstrArea == ""){
        subCat2.classList.add('hidden')
      }else{
        subCat2.textContent = recipe.strArea
      }
     
      if(recipe.strCountry ==" "){
        subCat3.classList.add('hidden')
      }else{
        subCat3.textContent = recipe.strCountry
      }
      
    recipeMethod.textContent =recipe.strInstructions

}
recipeFuction(selectedRecipeId)