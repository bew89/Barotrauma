import requests
import re
from bs4 import BeautifulSoup
import json

# URL of the crafting page
url = "https://barotraumagame.com/wiki/Crafting"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    rows = soup.find_all('tr')
    first = 0
    # Created a dict to hold all the recipes
    crafting_recipes = {}
    for row in rows:
        if first == 0:
            first += 1
            continue
        cells = row.find_all('td')
        product = row.find_all('th')
        combined_cells = cells + product
        # print("____________")
        # print(combined_cells)
        # print("_---------------")
        if combined_cells:
            cell_number = 0
            # print(combined_cells)
            # print("---------------")
            ingredients = {}

            for cell in combined_cells:
                amount = 1
                item = ""
                if cell_number == 0:
                    # print(cell)
                    ingredient_number = 0
                    for ingredient in cell:
                        # print(ingredient)
                        if ingredient.text:
                            text = ingredient.text.replace('\n', '').strip()
                            if text == "":
                                continue
                            pattern = r'\(x\d+\)|x\d+'
                            if re.search(pattern, text):
                                # print(text)
                                if "(" in text:
                                    text = text.replace('(', '').replace(')', '')

                                amount = text.replace('x', '')
                                # amount = text[2]
                                print(f"Amount: {amount}")
                                last_item = list(ingredients.keys())[-1]
                                ingredients[last_item]["amount"] = amount
                            elif "(produces" in text:
                                pass
                            else:
                                print(f"Ingredient: {text}")
                                item = text
                                ingredients[item] = {
                                    "amount": 1
                                }
                                ingredient_number += 1

                elif cell_number == 4:
                    product = cell.text.strip()
                    print(f"Product: {product}")

                    crafting_recipes[product] = {
                        "ingredients": ingredients
                    }

                cell_number += 1
            print("------------------")

            # for testing
            # break
    for recipe in crafting_recipes:
        print(recipe)
        print(crafting_recipes[recipe])
        print("---------------------------------------------------")


    # Convert dictionary to JSON string with indentation for readability
    json_data = json.dumps(crafting_recipes, indent=4)

    # Save JSON data to a file
    with open('crafting_recipes.json', 'w') as json_file:  # 'w' mode for writing
        json_file.write(json_data)


else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
