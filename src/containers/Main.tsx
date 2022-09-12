import React, {useEffect, useState, Dispatch, SetStateAction, useRef, useCallback} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {MemoryRouter, BrowserRouter as Router, Switch, Redirect, Link, useLocation, Route} from "react-router-dom";
import {State} from "../data/state";
import {
    loadDb
} from "../data/actions";
import Loading from "../components/Loading";
import useCSS from "../hooks/useCSS";
import {Db} from "../../types/Db";
import {CONST} from "../data/constants";
import Navigation from "../components/Navigation";
import Recipes from "./Recipes";
import {RiHome2Fill} from 'react-icons/ri';
import {Container, Content, Header, Icon, Sidebar} from "rsuite";
import {SnowflakeO, Amazon, Book} from "@rsuite/icons/es/icons/legacy";
import Fridge from "./Fridge";
import Ingredients from "./Ingredients";

const {} = CONST;

interface Props {
}

const Main = (props: Props): React.ReactElement => {
    const {} = props;
    const recipes: Db.Recipes = useSelector((state: State) => state.recipes, shallowEqual);
    const ingredients: Db.Ingredients = useSelector((state: State) => state.ingredients, shallowEqual);
    const fridge: Db.Fridge = useSelector((state: State) => state.fridge, shallowEqual);
    const dimensions: { width: number; height: number } = useSelector((state: State) => state.dimensions, shallowEqual);
    const [canLoadChildren, setCanLoadChildren] = useState(false);
    const [navigation] = useState([
        {key: 'recipes', icon: <Book/>},
        {key: 'ingredients', icon: <Amazon/>},
        {key: 'fridge', icon: <SnowflakeO/>}
    ]);

    const dispatch: any = useDispatch();
    const [css] = useCSS();

    useEffect(() => {
        dispatch(loadDb());
    }, []);

    useEffect(() => {
        if (!canLoadChildren && !!recipes && !!ingredients && !!fridge) {

            setCanLoadChildren(true);
        }
    }, [recipes, ingredients, fridge]);

    return (
        canLoadChildren ? <Container className={css('container')}>
                <Router>
                    <Sidebar><Navigation {...{navigation}}/></Sidebar>
                    <Content>
                        <Switch>
                            <Route path={`/recipes`}>
                                <Recipes/>
                            </Route>
                            <Route path={`/ingredients`} exact>
                                <Ingredients/>
                            </Route>
                            <Route path={`/fridge`} exact>
                                <Fridge/>
                            </Route>
                            <Redirect to={`/recipes`}/>
                        </Switch>
                    </Content>
                </Router>
            </Container>
            : <Loading/>
    );
};

export default Main;
