import React, {useEffect, useState} from "react";
import {Db} from "../../types/Db";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {State} from "../data/state";
import Ingredients from "../components/Ingredients";
import {deleteIngredientInDb, postIngredientInDb, putIngredientInDb} from "../data/actions";

//@TODO save the ingredient

const IngredientsContainer = (): React.ReactElement => {

    const ingredients: Db.Ingredients = useSelector(({ingredients}: State) => ingredients || [], shallowEqual);
    const recipes: Db.Recipes = useSelector(({recipes}: State) => recipes, shallowEqual);
    const [ingredientsInRecipes, setIngredientsInRecipes] = useState({});

    const dispatch: any = useDispatch();

    useEffect(() => {
        if (!!recipes) {

            setIngredientsInRecipes(Object.assign(
                {},
                ...recipes
                    .map(({ingredients}) => ingredients.map(({ingredientId}) => ingredientId))
                    .reduce((ingredientsA, ingredientsB) => ingredientsA.concat(ingredientsB))
                    .map(ingredientId => ({[ingredientId]: true}))))
        }
    }, [recipes])

    const saveIngredient = (ingredient: Db.Ingredient, isNew: boolean) => {
        if (isNew)
            dispatch(postIngredientInDb(ingredient));
        else
            dispatch(putIngredientInDb(ingredient));
    }

    const deleteIngredient = (id: number) => {
        dispatch(deleteIngredientInDb(id));
    }

    return <Ingredients {...{saveIngredient, deleteIngredient, ingredientsInRecipes, ingredientsStore: ingredients}}/>;
};

export default IngredientsContainer;