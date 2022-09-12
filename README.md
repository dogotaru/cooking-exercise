# Create a react app that let's the user cook it's favourite meal.

The app should allow the user to manage recipes:
- As a user i want to navigate to the "Recipes" page.
- As a user I want to be able to create a new recipe based on the ingredients defined in the dictionary (db.json - ingredients). The recipe should have a name, a duration to cook (in minutes) and a list of ingredients.
- As a user i want to be able to update a recipe.
- As a user I want to be able to delete a recipe.

The app should allow the user to manage his ingredient stock:
- As a user I want to navigate to "My Stock"
- As a user i want to be able to check what ingredients i have
- As a user I want to be able to buy new ingredients based on the ingredients defined in the dictionary (db.json - ingredients)

The app should allow the user to cook a recipe:
- As a user I want to navigate to "Cook Now".
- As a user I want to be able to select a recipe. Once selected the app should inform me if I have the required quantity of ingredients in stock. If not I should not be able to start cooking.
- As a user, given that i have enough ingredients to cook the recipe, I want to be able to start cooking.
	- Once started, I want a list of required ingredients to appear. 
	- [OPTIONAL] Once started a timer should appear according to the recipe's duration
	- As I click on an ingredient, it should be substracted from the available quantity in stock, and added to the "cooker".
	- Once all required ingredients were added a button should appear "Eat"
	- [OPTIONAL] The eat button should appear after 90% of the duration has passed
	- Once i click on the Eat button, the "kitchen" should be emptied.
	- [OPTIONAL] If i wait until after the duration has passed a popup should apear informing me that I have burned down my kitchen and I have nothing to eat. (the popup should give me the option to start from scratch)
	
The app should be built using React and React router.

The app should use the attached db.json as a mock backend (more info: https://github.com/typicode/json-server)
> npm install -g json-server

> json-server --watch db.json

The app should use a form of state management (either Redux or hooks with Context API) to store the ingredients.

Furthermore, whenever a user adds an element to My Stock, the state in the store/ context should be updated, whenever an ingredient is used to cook, the quantity should be substracted from the store.

[OPTIONAL] Use TypeScript with React.

Use SCSS or a POSTCSS library by choice (e.g Tailwind) to style components.

