import React from "react";
import Recipes from "../components/Recipes";
import {Db} from "../../types/Db";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {State} from "../data/state";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import RecipeUpdate from "../containers/RecipeUpdate";
import {deleteRecipeInDb} from "../data/actions";
import RecipeCook from "./RecipeCook";

const RecipesContainer = (props: any): React.ReactElement => {

    const recipes: Db.Recipes = useSelector((state: State) => state.recipes, shallowEqual);

    const {path, url} = useRouteMatch();
    const dispatch: any = useDispatch();

    const deleteRecipe = (id: number) => {
        dispatch(deleteRecipeInDb(id));
    }

    return (
        <Switch>
            <Route path={`${path}/add`} exact>
                <RecipeUpdate isNew/>
            </Route>
            <Route path={`${path}/update/:id`} exact>
                <RecipeUpdate/>
            </Route>
            <Route path={`${path}/cook/:id`} exact>
                <RecipeCook/>
            </Route>
            <Route exact path={path}>
                <Recipes {...{recipes, deleteRecipe}}/>
            </Route>
            <Redirect to={`/recipes`}/>
        </Switch>
    );
};

export default RecipesContainer;