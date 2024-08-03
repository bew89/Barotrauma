let recipes = {}

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

function displayData(recipes){
    const tableBody = document.querySelector('#recipesTable tbody');
    //Clear the contents of the table
    tableBody.innerHTML = '';
    Object.keys(recipes).forEach(recipeName => {
        // console.log(recipeName);
        const recipe = recipes[recipeName];

        //Create a row for the name and add it to the row
        const row = document.createElement('tr');
        const name = document.createElement('td');
        const img = document.createElement('img');
        img.src = `images/Zinc.png`;
        img.style.width = '50px';
        img.style.height = 'auto';
        name.textContent = recipeName;

        row.appendChild(name);
        // row.appendChild(img);
        // console.log(recipe.name)
        // console.log(name)

        //Create a section for the divs
        const fragment = document.createDocumentFragment();

        const ingredients = document.createElement('td');
        const ingredientsList = Object.keys(recipe.ingredients).map(ingredient => {
            return ingredientName = `${ingredient} `;//(${recipe.ingredients[ingredient].amount})` ;
        });

        //Go through each ingredient and append it to its own div so that it is on a different line
        for (const ingredient of ingredientsList) {
            const line = document.createElement('div');
            const img = document.createElement('img');
            const img2 = document.createElement('img');
            console.log();

            let editedIngredient = ingredient.replace(' ', "_");

            // for (let i = 0; i < ingredient.length; i++) {
            //     if(editedIngredient[i] === ' '){
            //         editedIngredient[i].replace("_");
            //     }
            // }
            for(let i = 0; i < editedIngredient.length; i++) {
                if(i === editedIngredient.length - 1) {
                    editedIngredient[i].replace('')
                }
            }
            //"C:\Users\benwo\github\barotrauma\Barotrauma\images\Zinc.png"
            let certainIngredient = "Zinc"
            console.log(ingredient);
            console.log(editedIngredient);
            img.src = `images/${ingredient.trim()}.png`;
            img.alt = ingredient;
            img.style.width = '25px';
            img.style.height = 'auto';

            img2.src = `images/${editedIngredient.trim()}.png`;
            img2.alt = ingredient;
            img2.style.width = '25px';
            img2.style.height = 'auto';

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
            // Add the image and the ingredient text to the div
            // line.appendChild(img);
            // line.appendChild(img2);
            const textNode = document.createTextNode(ingredient);
            line.appendChild(textNode);

            fragment.appendChild(line);
        }

        //Add it to the ingredients and then add that to the row
        ingredients.appendChild(fragment)
        row.appendChild(ingredients);

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
            editedQuery = query[0].toUpperCase(); // Capitalize the first letter
            for (let i = 1; i < query.length; i++) {
                editedQuery += query[i].toLowerCase(); // Lowercase the rest
            }
        }

        if (query) {
            let searchSuggestions = [];
                // const matchingIngredients = Object.keys(recipes)
                //     .filter(productName => productName.toLowerCase().startsWith(query.toLowerCase()))
                //     .reduce((acc, productName) => {
                //         acc[productName] = recipes[productName];
                //         return acc;
                //     }, {});
            const matchingIngredients = Object.keys(recipes)
                .filter(productName => {
                    // Check if the product name matches the query
                    if (productName.toLowerCase().startsWith(query)) {
                        return true;
                    }
                    // Check if any of the ingredients match the query
                    const ingredients = recipes[productName].ingredients;
                    return Object.keys(ingredients).some(ingredient => ingredient.toLowerCase().startsWith(query));
                })
                .reduce((acc, productName) => {
                    acc[productName] = recipes[productName];
                    return acc;
                }, {});

                searchSuggestions.push(matchingIngredients);
            console.log(searchSuggestions[0])
            displaySpecificData(searchSuggestions[0])
        }else{
            displayData(recipes)
        }
    })
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    })


function displaySpecificData(recipes){
    const tableBody = document.querySelector('#recipesTable tbody');
    //Clear the contents of the table
    tableBody.innerHTML = '';
    Object.keys(recipes).forEach(recipeName => {
        console.log(recipeName)

        const recipe = recipeName;

        //Create a row for the name and add it to the row
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.textContent = recipeName;
        row.appendChild(name);
        console.log(name)

        //Create a section for the divs
        const fragment = document.createDocumentFragment();

        const ingredients = document.createElement('td');
        console.log("hello")
        console.log("recipe.ingredients");
        console.log(recipe.ingredients);

        console.log("recipes[recipeName]");
        console.log(recipes[recipeName]);

        console.log("recipes[recipeName].ingredients")
        console.log(recipes[recipeName].ingredients)

        console.log("recipes[recipeName].ingredients.amount")
        console.log(recipes[recipeName].ingredients)


        const ingredientsList = Object.keys(recipes[recipeName].ingredients).map(ingredient => {
            return ingredientName = `${ingredient} (${recipes[recipeName].ingredients[ingredient].amount})` ;
        });

        // const ingredientsList = Object.keys(recipes[recipeName].ingredients).map(ingredient => {
        //     console.log(ingredientName)
        //     console.log("hfia")
        //     console.log(ingredient)
        //
        //     console.log("first")
        //     console.log(`${ingredient} (${recipes[recipeName].ingredients})`)
        //     console.log("second")
        //     console.log(ingredient)
        //     // return ingredientName = `${ingredient} (${recipe.ingredients[ingredient].amount})` ;
        //    return ingredientName = `${ingredient} (${recipes[recipeName].ingredients.amount})` ;
        // });

        //Go through each ingredient and append it to its own div so that it is on a different line
        for (const ingredient of ingredientsList) {
            const line = document.createElement('div');
            line.innerHTML = ingredient;
            fragment.appendChild(line);
        }

        //Add it to the ingredients and then add that to the row
        ingredients.appendChild(fragment)
        row.appendChild(ingredients);

        tableBody.appendChild(row);
    })

}
getData()