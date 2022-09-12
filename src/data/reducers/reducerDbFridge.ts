import {TYPES} from "../actions";
import {Db} from "../../../types/Db";
import {Action} from "../../../types/Actions";

export default function (fridge: Db.Fridge = null, action: Action): Db.Fridge {
    switch (action.type) {
        case TYPES.LOAD_DB_FRIDGE:
            return (action.payload || []) as Db.Fridge;
    }
    return fridge;
}
