// https://www.themealdb.com/api.php   

fetch('https://www.themealdb.com/api/json/v1/1/search.php?')
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0];
    console.log(`Recipe: ${meal.strMeal}`);
    console.log(`Instructions: ${meal.strInstructions}`);
  })
  .catch(error => console.error('Error fetching data:', error));
