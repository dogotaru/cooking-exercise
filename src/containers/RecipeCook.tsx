import React, {useEffect, useState} from "react";
import {Db} from "../../types/Db";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {State} from "../data/state";
import {Redirect, Route, Switch, useHistory, useParams, useRouteMatch} from "react-router-dom";
import RecipeUpdate from "../components/RecipeUpdate";
import {postFridgeInDb, postIngredientInDb, postRecipeInDb, putIngredientInDb, putRecipeInDb} from "../data/actions";
import RecipeCook from "../components/RecipeCook";

// @TODO: save the recipe

interface QueryParams {
    id?: string;
}

const RecipeCookContainer = (): React.ReactElement => {

    const recipes: Db.Recipes = useSelector(({recipes}: State) => recipes || [], shallowEqual);
    const fridge: Db.Fridge = useSelector(({fridge}: State) => fridge || [], shallowEqual);
    const ingredients: Db.Ingredients = useSelector(({ingredients}: State) => ingredients || [], shallowEqual);

    const {id: qId = '0'}: QueryParams = useParams();
    const [id] = useState(parseInt(qId));
    const [recipe] = useState(recipes.find(({id: recipeId}) => id === recipeId) as Db.Recipe);

    const dispatch: any = useDispatch();
    const substractFromFridge = (ingredientsInRecipe: Db.IngredientsInRecipe) => {
        const fridgeItems: { method: string, item: Db.IngredientInFridgeItem | number }[] = [];

        fridge.forEach(fridgeIngredient => {

            const {ingredientId: updatingId, availableQuantity} = fridgeIngredient;
            const {quantity} = ingredientsInRecipe.find(({ingredientId}) => updatingId === ingredientId) || {} as Db.IngredientInRecipeItem;

            if (quantity) {

                fridgeItems.push({
                    method: "PUT",
                    item: {
                        ...fridgeIngredient,
                        availableQuantity: parseFloat(`${availableQuantity}`) - parseFloat(`${quantity}`)
                    }
                });
                dispatch(postFridgeInDb(fridgeItems));
            }
        });
    }

    return (
        recipe ?
            <RecipeCook {...{
                id,
                ingredientsStore: ingredients,
                fridge: fridge || [],
                recipe: recipe || {},
                substractFromFridge
            }} /> :
            <Redirect to={'../../'}/>
    );
};

export default RecipeCookContainer;