import React, {useEffect, useState} from "react";
import {Nav} from "rsuite";
import useCSS from "../hooks/useCSS";
import {useHistory, useLocation} from "react-router-dom";
import {IconType} from "react-icons/lib";
import {Navigation} from "../../types/Navigation";

interface Props {
    navigation: Navigation.Main
}

const Navigation = ({navigation}: Props): React.ReactElement => {

    const [{key: homeKey}] = navigation;
    const [active, setActive] = useState(homeKey);

    const [css] = useCSS();
    const history = useHistory();

    useEffect(() => {
        if (`/${active}` !== history.location.pathname) {

            history.push(`/${active}`);
        }
    }, [active])

    return (
        <Nav appearance="subtle" vertical activeKey={active} onSelect={setActive} className={css(['navigation'])}>
            {navigation.map(
                ({key, icon}) =>
                    <Nav.Item key={`__key_navigation${key}`} className={css('item')} {...(icon ? {icon} : {})} eventKey={key}>
                        {key}
                    </Nav.Item>
            )}
        </Nav>
    );
}

export default Navigation;