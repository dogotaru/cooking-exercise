import { TYPES } from "../actions";

export default function(dimensions: any = {}, action: any): any {
    switch (action.type) {
        case TYPES.SAVE_DIMENSIONS:
            return action.payload;
    }
    return dimensions;
}
