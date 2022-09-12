import React, {useEffect, useState} from "react";
import {Db} from "../../types/Db";
import {Button, ButtonToolbar, CheckPicker, Container, Content, Divider, Footer, Input, InputGroup} from "rsuite";
import useCSS from "../hooks/useCSS";

interface Props {
    ingredientsStore: NonNullable<Db.Ingredients>;
    fridge: NonNullable<Db.Fridge>;
    save: (fridge: NonNullable<Db.Fridge>) => void;
}

const RecipeUpdateContainer = ({ingredientsStore, fridge, save}: Props): React.ReactElement => {

    const [inputIngredients, setInputIngredients] = useState(fridge.map(({ingredientId}) => ingredientId));
    const [fridgeIngredientIds] = useState(Object.assign({}, ...fridge.map(({id, ingredientId}) => [ingredientId, id])));
    const [inputQuantities, setInputQuantities] = useState(
        Object.fromEntries(fridge.map(({ingredientId, availableQuantity}) => [ingredientId, availableQuantity]))
    );

    const [css] = useCSS();

    return (
        <Container>
            <Content>
                <label><b>The fridge:</b></label>
                <br/><br/>
                <InputGroup>
                    <InputGroup.Addon>Ingredients:</InputGroup.Addon>
                    <CheckPicker
                        value={inputIngredients}
                        onChange={(value) => {
                            setInputIngredients(value);
                        }}
                        data={ingredientsStore.map(({name, id}: Db.Ingredient) => ({label: name, value: id}))}
                        sort={isGroup => {
                            return (
                                {label: labelA, sortA = labelA.toUpperCase()},
                                {label: labelB, sortB = labelB.toUpperCase()}
                            ) => (sortA < sortB) ? -1 : (sortA > sortB) ? 1 : 0;
                        }}
                        className={css('ingredientsToggle')}
                    />
                </InputGroup>
                <br/>
                <label><b>Available:</b></label>
                <br/><br/>
                {inputIngredients.map((ingredientId, index) => {

                    const {
                        id,
                        name,
                        measure
                    } = ingredientsStore.find(({id}) => id === ingredientId) || {} as Db.Ingredient
                    return !!id ? [
                        <InputGroup key={`__key_inputGroup_${index}`}>
                            <InputGroup.Addon style={{width: 200}}>{name}</InputGroup.Addon>
                            <Input placeholder="(digits amd dot only)" value={`${inputQuantities[id] || 0}`}
                                   onChange={value => {
                                       if (/^[0-9.]+$/.test(value))
                                           setInputQuantities({...inputQuantities, [id]: value});
                                   }}/>
                            <InputGroup.Addon style={{width: 150}}>{measure}</InputGroup.Addon>
                        </InputGroup>,
                        <br key={`__key_lineBreak_${index}`}/>
                    ] : null
                })}
            </Content>
            <Footer>
                <ButtonToolbar>
                    <Button color="yellow" appearance="primary"
                            onClick={() => {
                                save(
                                    inputIngredients.map(id => ({
                                        id: fridgeIngredientIds[id] || 0,
                                        ingredientId: id,
                                        availableQuantity: inputQuantities[id] || 0
                                    }))
                                );
                            }}>Refill the fridge</Button>
                </ButtonToolbar>
            </Footer>
        </Container>
    );
};

export default RecipeUpdateContainer;