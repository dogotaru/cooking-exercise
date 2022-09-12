import { TYPES } from "../actions";

export default function(css: any = {}, action: any): any {
    switch (action.type) {
        case TYPES.REGISTER_CSS:
            return action.payload;
    }
    return css;
}
