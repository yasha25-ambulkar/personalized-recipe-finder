// This function will fetch recipes based on the ingredients entered by the user
async function getRecipes() {
    const ingredientInput = document.getElementById('ingredient-input').value.trim();
    if (!ingredientInput) {
        alert('Please enter some ingredients!');
        return;
    }

    const apiKey = '9582d1bd57da40db8570ed83b7787844'; // Replace with your Spoonacular API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientInput}&number=5&apiKey=${apiKey}`;

    try {
        // Fetch recipes data from Spoonacular API
        const response = await fetch(url);
        const recipes = await response.json();

        // Clear any previous recipes
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = '';

        if (recipes.length === 0) {
            recipeContainer.innerHTML = '<p>No recipes found. Try different ingredients!</p>';
            return;
        }

        // Display the recipes on the page
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // Recipe content
            recipeCard.innerHTML = `
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
            `;

            // Append the recipe card to the recipe container
            recipeContainer.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Sorry, something went wrong. Please try again later.');
    }
}
