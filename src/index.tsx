import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, combineReducers, compose, createStore, Middleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {registerCssAction, saveDimensionsAction} from "./data/actions/bundle";
import reducerCSS from "./data/reducers/reducerCSS";
import reducerDimensions from "./data/reducers/reducerDimensions";
import Loading from "./components/Loading";

// @TODO: some kind of deployment pipeline for github
// @TODO: replace json-server with google firebase
// @TODO: navigation

const promisedInitChunks = Promise.all([
    import('rsuite/lib/styles/core.less'),
    import('rsuite/lib/Loader/styles/themes/default.less')
]);

const promisedChunks = Promise.all([
    import(/* webpackChunkName: "rsuiteCss"*/ "rsuite/lib/styles/index.less"),
    import(/* webpackChunkName: "css"*/ "../resources/css/scss/main.scss"),
    import(/* webpackChunkName: "main"*/ "./containers/Main"),
    import(/* webpackChunkName: "reducers"*/ "./data/state")
]);

const logger = (store: any) => (next: any) => (action: any) => {
    let result = next(action);
    console.log(
        "%c[ LOG ]:",
        "color: #888888; font-weight: bold;",
        {
            type: action.type,
            action,
            nextState: store.getState()
        }
    );
    return result;
};

const crashReporter = (store: any) => (next: any) => (action: any) => {
    try {
        return next(action);
    } catch (err) {
        console.log(
            "%c[ ERROR ]:",
            "color: #ff0000; font-weight: bold;",
            {err}
        );
        throw err;
    }
};

const store = createStore(
    combineReducers({
        css: reducerCSS,
        dimensions: reducerDimensions
    }),
    compose(
        applyMiddleware(
            thunkMiddleware as Middleware,
            logger as Middleware,
            // ReduxPromise as Middleware,
            crashReporter as Middleware
        )
    )
);

const target = document.getElementById("react-document-container");

promisedInitChunks.then((initChunks: any[]) =>
    (([]: any[]) => {
        ReactDOM.render(<Loading/>, target);
    })(initChunks.map(({default: chunk}) => chunk))
);

promisedChunks.then((lazyChunks: any[]) =>
    (([rsuiteCss, css, Main, reducers]: any[]) => {
        store.dispatch(registerCssAction(css));
        store.dispatch(
            saveDimensionsAction({
                width: document.body.clientWidth,
                height: document.body.clientHeight
            })
        );
        store.replaceReducer(reducers);

        ReactDOM.render(
            <Provider store={store}>
                <Main/>
            </Provider>,
            target
        );
    })(lazyChunks.map(({default: chunk}) => chunk))
);