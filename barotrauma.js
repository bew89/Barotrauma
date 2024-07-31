let recipes = {}

fetch('crafting_recipes.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {
        recipes = data
        console.log(recipes);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
