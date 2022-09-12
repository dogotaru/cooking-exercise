import {Fridge, Ingredients, Recipes} from "./Db";

export type RandomObject = { [key: string]: any };
export type Payload = RandomObject | any[] | string | boolean | null;

export interface Action {
    type: string;
    payload: Payload | Recipes | Fridge | Ingredients;
}