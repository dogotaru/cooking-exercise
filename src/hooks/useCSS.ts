import { shallowEqual, useSelector } from "react-redux";
import { State } from "../data/state";

const _css = (css: any) => (className: string[] | string): string => {
    if (typeof className === "string") return css[className] || "";

    return className
        .map(_className => css[_className] || "")
        .filter(Boolean)
        .join(" ");
};

const useCSS = (): any => {
    const css: {} = useSelector((state: State) => state.css, shallowEqual);

    return [_css({ ...css })];
};
export default useCSS;