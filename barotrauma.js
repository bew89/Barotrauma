let recipes = {}
let currentRecipe = {}
function getData() {
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
            displayData(recipes)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}

function replaceData(item) {
    let editedItem = item.replace(' ', "_");

    for (let i = 0; i < editedItem.length; i++) {
        if (i === editedItem.length - 1) {
            editedItem[i].replace('')
        }
    }
    return editedItem
}

function displayData(recipes) {
    currentRecipe = recipes;
    const tableBody = document.querySelector('#recipesTable tbody');
    //Clear the contents of the table
    tableBody.innerHTML = '';
    Object.keys(recipes).forEach(recipeName => {
        // console.log(recipeName);
        const recipe = recipes[recipeName];

        //Create a row for the name and add it to the row
        const row = document.createElement('tr');
        const name = document.createElement('td');
        const productImg = document.createElement('img');
        const productImg2 = document.createElement('img');

        productImg.src = `images/${recipeName.trim()}.png`;
        productImg.alt = recipeName;

        let editedProduct = replaceData(recipeName);
        productImg2.src = `images/${editedProduct.trim()}.png`;
        productImg2.alt = editedProduct;


        function checkImage(src, imgElement, callback) {
            const img = new Image();
            img.onload = () => {
                imgElement.src = src;
                imgElement.alt = recipeName;
                callback(true);
            };
            img.onerror = () => callback(false);
            img.src = src;
        }

        checkImage(productImg.src, productImg, (isValid) => {
            if (isValid) {
                name.appendChild(productImg);
            }else{
                name.appendChild(productImg2)
            }
        });
        const textNode = document.createTextNode(recipeName);

        name.appendChild(textNode);
        row.appendChild(name);


        //Create a section for the divs
        const fragment = document.createDocumentFragment();
        let listOfIngredientAmounts = []
        const ingredients = document.createElement('td');
        const ingredientsList = Object.keys(recipe.ingredients).map(ingredient => {
            listOfIngredientAmounts += (recipe.ingredients[ingredient].amount);
            return ingredientName = `${ingredient} `;//(${recipe.ingredients[ingredient].amount})` ;
        });
        //Go through each ingredient and append it to its own div so that it is on a different line
        for (const ingredient of ingredientsList) {
            const line = document.createElement('div');
            const img = document.createElement('img');
            const img2 = document.createElement('img');
            console.log();

            let editedIngredient = ingredient.replace(' ', "_");

            for (let i = 0; i < editedIngredient.length; i++) {
                if (i === editedIngredient.length - 1) {
                    editedIngredient[i].replace('')
                }
            }
            //"C:\Users\benwo\github\barotrauma\Barotrauma\images\Zinc.png"
            let certainIngredient = "Zinc"
            console.log(ingredient);
            console.log(editedIngredient);
            img.src = `images/${ingredient.trim()}.png`;
            img.alt = ingredient;
            // img.style.width = '25px';
            // img.style.height = 'auto';

            img2.src = `images/${editedIngredient.trim()}.png`;
            img2.alt = ingredient;
            // img2.style.width = '25px';
            // img2.style.height = 'auto';

            function checkImage(src, imgElement, callback) {
                const img = new Image();
                img.onload = () => {
                    imgElement.src = src;
                    imgElement.alt = ingredient;
                    imgElement.style.width = '25px';
                    imgElement.style.height = 'auto';
                    callback(true);
                };
                img.onerror = () => callback(false);
                img.src = src;
            }

            checkImage(img.src, img, (isValid) => {
                if (isValid) {
                    line.appendChild(img);
                }
            });

            checkImage(img2.src, img2, (isValid) => {
                if (isValid) {
                    line.appendChild(img2);
                }
            });

            console.log(ingredient);
            console.log(recipe.ingredients[ingredient.trim()]);
            let multiplier = document.getElementById('amount').value;
            if(multiplier <= 1) {
                multiplier = 1;
            }
            const textNode = document.createTextNode(`${ingredient} (${recipe.ingredients[ingredient.trim()].amount * multiplier})`);
            line.appendChild(textNode);

            fragment.appendChild(line);
        }

        //Add it to the ingredients and then add that to the row
        ingredients.appendChild(fragment)
        row.appendChild(ingredients);

        const goToRecipeLink = () => {
            window.location.href = `https://barotraumagame.com/wiki/${recipeName}`;
        };
        row.addEventListener('click', goToRecipeLink);
        row.addEventListener('touchstart', goToRecipeLink);
        
        tableBody.appendChild(row);
    })

}

document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const suggestionsContainer = document.getElementById('suggestions');

    searchBar.addEventListener('input', function () {
        const query = searchBar.value;
        //Turn the first letter uppercase and the rest lowercase
        let editedQuery = '';

        if (query.length > 0) {
            // editedQuery = query[0].toUpperCase(); // Capitalize the first letter
            for (let i = 0; i < query.length; i++) {
                editedQuery += query[i].toLowerCase(); // Lowercase the rest
            }
        }

        if (query) {
            let searchSuggestions = [];
            const matchingIngredients = Object.keys(recipes)
                .filter(productName => {
                    // Check if the product name matches the query
                    if (productName.toLowerCase().startsWith(query.toLowerCase())) {
                        return true;
                    }
                    // Check if any of the ingredients match the query
                    const ingredients = recipes[productName].ingredients;
                    return Object.keys(ingredients).some(ingredient => ingredient.toLowerCase().startsWith(query.toLowerCase()));
                })
                .reduce((acc, productName) => {
                    acc[productName] = recipes[productName];
                    return acc;
                }, {});

            searchSuggestions.push(matchingIngredients);
            console.log(searchSuggestions[0])
            displayData(searchSuggestions[0])
         } else {
             displayData(recipes)
         }
    })
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    const amount = document.getElementById('amount');

    amount.addEventListener('input', function () {
        displayData(currentRecipe);
    })
})


getData()