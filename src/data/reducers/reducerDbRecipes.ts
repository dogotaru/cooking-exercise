import {TYPES} from "../actions";
import {Action} from "../../../types/Actions";
import {Db} from "../../../types/Db";

export default function (recipes: Db.Recipes = null, action: Action): Db.Recipes {
    switch (action.type) {
        case TYPES.LOAD_DB_RECIPES:
            return (action.payload || []) as Db.Recipes;
    }
    return recipes;
}
