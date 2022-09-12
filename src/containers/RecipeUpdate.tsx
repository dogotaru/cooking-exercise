import React, {useEffect, useState} from "react";
import {Db} from "../../types/Db";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {State} from "../data/state";
import {Redirect, Route, Switch, useHistory, useParams, useRouteMatch} from "react-router-dom";
import RecipeUpdate from "../components/RecipeUpdate";
import {postIngredientInDb, postRecipeInDb, putIngredientInDb, putRecipeInDb} from "../data/actions";

// @TODO: save the recipe

interface QueryParams {
    id?: string;
}

interface Props {
    isNew?: boolean;
}

const RecipeUpdateContainer = ({isNew = false}: Props): React.ReactElement => {

    const recipes: Db.Recipes = useSelector(({recipes}: State) => recipes || [], shallowEqual);
    const ingredients: Db.Ingredients = useSelector(({ingredients}: State) => ingredients || [], shallowEqual);

    const {id: qId = '0'}: QueryParams = useParams();
    const [id] = useState(parseInt(qId));
    const [recipe] = useState(recipes.find(({id: recipeId}) => id === recipeId) as Db.Recipe);

    const dispatch: any = useDispatch();
    const history = useHistory();

    const saveRecipe = (recipe: Db.Recipe, isNew: boolean) => {
        if (isNew)
            dispatch(postRecipeInDb(recipe));
        else
            dispatch(putRecipeInDb(recipe));
        history.push('../../');
    }

    return (
        recipe || isNew ?
            <RecipeUpdate {...{id, isNew, saveRecipe, ingredientsStore: ingredients, recipe: recipe || {}}} /> :
            <Redirect to={'../../'}/>
    );
};

export default RecipeUpdateContainer;