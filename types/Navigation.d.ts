import {IconType} from "react-icons/lib";

export namespace Navigation {
    export interface Item {
        key: string;
        Icon: IconType;
    }
    export type Main = Navigation[]
}