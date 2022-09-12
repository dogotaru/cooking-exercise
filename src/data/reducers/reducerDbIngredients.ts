import {TYPES} from "../actions";
import {Action} from "../../../types/Actions";
import {Db} from "../../../types/Db";

export default function (ingredients: Db.Ingredients = null, action: Action): Db.Ingredients {
    switch (action.type) {
        case TYPES.LOAD_DB_INGREDIENTS:
            return (action.payload || []) as Db.Ingredients;
    }
    return ingredients;
}
