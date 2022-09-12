type ID = number;

export namespace Db {
    export type Measure = "gr" | "tsp" | "cup" | "piece" | "ml";
    export interface IngredientInRecipeItem {
        ingredientId: ID;
        quantity: number;
    }
    type IngredientsInRecipe = [] | IngredientInRecipeItem[];
    export interface Recipe {
        id: ID;
        recipeName: string;
        duration: number;
        ingredients: IngredientsInRecipe;
    }
    export interface Ingredient {
        id: ID;
        name: string;
        measure: Measure;
    }
    export interface IngredientInFridgeItem {
        id: ID,
        ingredientId: ID;
        availableQuantity: number;
    }
    export type Recipes = [] | Recipe[] | null;
    export type Ingredients = [] | Ingredient[] | null;
    export type Fridge = [] | IngredientInFridgeItem[] | null;
}