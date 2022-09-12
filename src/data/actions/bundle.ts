export const TYPES_BUNDLE = {
    REGISTER_CSS: "RegisterCSS",
    SAVE_DIMENSIONS: "SaveDimension"
};

export const saveDimensionsAction = (dimensions: any) => ({
    type: TYPES_BUNDLE.SAVE_DIMENSIONS,
    payload: dimensions
});

export const registerCssAction = (css: any) => ({
    type: TYPES_BUNDLE.REGISTER_CSS,
    payload: css
});