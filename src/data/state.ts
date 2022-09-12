import { combineReducers } from "redux";
import {Db} from "../../types/Db";
import reducerDimensions from "./reducers/reducerDimensions";
import reducerCSS from "./reducers/reducerCSS";
import reducerDbRecipes from "./reducers/reducerDbRecipes";
import reducerDbFridge from "./reducers/reducerDbFridge";
import reducerDbIngredients from "./reducers/reducerDbIngredients";

export interface State {
    css: any;
    dimensions: any;
    recipes: Db.Recipes;
    fridge: Db.Fridge;
    ingredients: Db.Ingredients;
}

const state = {
    dimensions: reducerDimensions,
    css: reducerCSS,
    recipes: reducerDbRecipes,
    fridge: reducerDbFridge,
    ingredients: reducerDbIngredients
};

export default combineReducers(state);
