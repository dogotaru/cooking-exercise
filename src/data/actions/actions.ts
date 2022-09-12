import { CONST } from "../constants";
import {Db} from "../../../types/Db";

export const {
    APP: {
        ACTIONS: { TYPES: TYPES_ACTIONS }
    }
} = CONST;

export const loadRecipesAction = (recipes: Db.Recipes) => ({
    type: CONST.APP.ACTIONS.TYPES.LOAD_DB_RECIPES,
    payload: recipes
});
export const loadFridgeAction = (fridge: Db.Fridge) => ({
    type: CONST.APP.ACTIONS.TYPES.LOAD_DB_FRIDGE,
    payload: fridge
});
export const loadIngredientsAction = (ingredients: Db.Ingredients) => ({
    type: CONST.APP.ACTIONS.TYPES.LOAD_DB_INGREDIENTS,
    payload: ingredients
});
export const errorInThunkAction = (error: any) => ({
    type: CONST.APP.ACTIONS.TYPES.ERROR_IN_THUNK,
    payload: error
});
export const errorInThunkDiscardAction = () => ({
    type: CONST.APP.ACTIONS.TYPES.ERROR_IN_THUNK_DISCARD,
    payload: null
});