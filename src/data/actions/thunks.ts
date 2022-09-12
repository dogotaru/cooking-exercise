import {Dispatch} from "redux";
import {errorInThunkAction, loadFridgeAction, loadIngredientsAction, loadRecipesAction} from "./";
import {deleteInDb, getDb, postInDb, putInDb} from "../handlers";
import {Db} from "../../../types/Db";

export function putIngredientInDb(ingredient: Db.Ingredient) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            putInDb("ingredients", ingredient)
        ])
            .then(([]: Array<any>) => {

                getDb("ingredients").then((ingredients => {

                    dispatch(loadIngredientsAction(ingredients));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'putIngredientInDb', error}));
            });
    };
}

export function postIngredientInDb(ingredient: Db.Ingredient) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            postInDb("ingredients", ingredient)
        ])
            .then(([]: Array<any>) => {

                getDb("ingredients").then((ingredients => {

                    dispatch(loadIngredientsAction(ingredients));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'postIngredientInDb', error}));
            });
    };
}

export function deleteIngredientInDb(id: number) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            deleteInDb("ingredients", id)
        ])
            .then(([]: Array<any>) => {

                getDb("ingredients").then((ingredients => {

                    dispatch(loadIngredientsAction(ingredients));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'deleteIngredientInDb', error}));
            });
    };
}

export function putRecipeInDb(recipe: Db.Recipe) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            putInDb("recipes", recipe)
        ])
            .then(([]: Array<any>) => {

                getDb("recipes").then((recipes => {

                    dispatch(loadRecipesAction(recipes));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'putRecipeInDb', error}));
            });
    };
}

export function postRecipeInDb(recipe: Db.Recipe) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            postInDb("recipes", recipe)
        ])
            .then(([]: Array<any>) => {

                getDb("recipes").then((recipes => {

                    dispatch(loadRecipesAction(recipes));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'postRecipeInDb', error}));
            });
    };
}

export function deleteRecipeInDb(id: number) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            deleteInDb("recipes", id)
        ])
            .then(([]: Array<any>) => {

                getDb("recipes").then((recipes => {

                    dispatch(loadRecipesAction(recipes));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'deleteRecipeInDb', error}));
            });
    };
}

export function postFridgeInDb(fridgeItems: { method: string, item: Db.IngredientInFridgeItem | number }[]) {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all(fridgeItems.map(({method, item}) => {
            switch (method) {
                case "POST":
                    return postInDb("fridge", item as Db.IngredientInFridgeItem);
                case "PUT":
                    return putInDb("fridge", item as Db.IngredientInFridgeItem);
                case "DELETE":
                    return deleteInDb("fridge", item as number);
            }
        }))
            .then(([]: Array<any>) => {

                getDb("fridge").then((fridge => {

                    dispatch(loadFridgeAction(fridge));
                }));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'postFridgeInDb', error}));
            });
    };
}

export function loadDb() {
    return async function (dispatch: Dispatch, getState: any) {

        Promise.all([
            getDb("recipes"),
            getDb("fridge"),
            getDb("ingredients"),
        ])
            .then(([recipes, fridge, ingredients]: Array<any>) => {

                dispatch(loadRecipesAction(recipes));
                dispatch(loadFridgeAction(fridge));
                dispatch(loadIngredientsAction(ingredients));
            })
            .catch((error: any) => {

                dispatch(errorInThunkAction({thunk: 'loadDb', error}));
            });
    };
}