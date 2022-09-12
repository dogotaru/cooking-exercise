import React from "react";
import {Db} from "../../types/Db";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {State} from "../data/state";
import Fridge from "../components/Fridge";
import {postFridgeInDb, postRecipeInDb} from "../data/actions";

//@TODO save the fridge

const FridgeContainer = (): React.ReactElement => {

    const fridge: Db.Fridge = useSelector(({fridge}: State) => fridge || [], shallowEqual);
    const ingredients: Db.Ingredients = useSelector(({ingredients}: State) => ingredients || [], shallowEqual);

    const dispatch: any = useDispatch();

    const save = (updatingFridge: NonNullable<Db.Fridge>) => {

        const fridgeItems: { method: string, item: Db.IngredientInFridgeItem | number }[] = [];

        updatingFridge.forEach(fridgeIngredient => {

            const {id: updatingId} = fridgeIngredient;
            const method = (fridge.find(({id}) => updatingId === id)) ? "PUT" : "POST";
            fridgeItems.push({method,  item: fridgeIngredient});
        })
        fridge.forEach(({id}) => {
            if (!updatingFridge.find(({id: updatingId}) => updatingId === id))
                fridgeItems.push({method: "DELETE",  item: id});
        })
        dispatch(postFridgeInDb(fridgeItems));
    }

    return <Fridge {...{save, fridge, ingredientsStore: ingredients}}/>;
};

export default FridgeContainer;