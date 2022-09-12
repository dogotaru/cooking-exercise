import React, {useEffect, useState} from "react";
import {Db} from "../../types/Db";
import {Button, ButtonToolbar, CheckPicker, Container, Content, Divider, Footer, Input, InputGroup} from "rsuite";
import useCSS from "../hooks/useCSS";

interface Props {
    recipe: Db.Recipe;
    ingredientsStore: NonNullable<Db.Ingredients>;
    id: number;
    isNew: boolean;
    saveRecipe: (recipe: Db.Recipe, isNew: boolean) => void;
}

const RecipeUpdate = ({id, recipe, ingredientsStore, isNew, saveRecipe}: Props): React.ReactElement => {

    const {recipeName = '', duration = 0, ingredients: ingredientsInRecipe = []} = recipe;
    const [inputRecipeName, setInputRecipeName] = useState(recipeName);
    const [inputDuration, setInputDuration] = useState(`${duration}`);
    const [inputIngredients, setInputIngredients] = useState(ingredientsInRecipe.map(({ingredientId}) => ingredientId));
    const [inputQuantities, setInputQuantities] = useState(
        Object.fromEntries(ingredientsInRecipe.map(({ingredientId, quantity}) => [ingredientId, quantity]))
    );

    const [css] = useCSS();

    return (
        <Container>
            <Content>
                <label><b>Recipe:</b></label>
                <br/><br/>
                <InputGroup>
                    <InputGroup.Addon>Recipe name:</InputGroup.Addon>
                    <Input placeholder="(letters only)" value={inputRecipeName} onChange={value => {
                        if (/^[a-zA-Z]+$/.test(value))
                            setInputRecipeName(value);
                    }}/>
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroup.Addon>Duration in seconds:</InputGroup.Addon>
                    <Input placeholder="(digits only)" value={inputDuration} onChange={value => {
                        if (/^[0-9]+$/.test(value))
                            setInputDuration(value);
                    }}/>
                </InputGroup>
                <br/>
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
                <label><b>Measures:</b></label>
                <br/><br/>
                {inputIngredients.map((ingredientId, index) => {

                    const {id, name, measure} = ingredientsStore.find(({id}) => id === ingredientId) as Db.Ingredient
                    return [
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
                    ]
                })}
            </Content>
            <Footer>
                <ButtonToolbar>
                    <Button color="yellow" appearance="primary"
                            onClick={() => {
                                saveRecipe({id, recipeName: inputRecipeName, ingredients: inputIngredients.map(id => ({
                                        ingredientId: id,
                                        quantity: inputQuantities[id] || 0
                                    })), duration: parseInt(inputDuration)}, isNew);
                            }}>Save {isNew ? 'New' : ''} Recipe</Button>
                </ButtonToolbar>
            </Footer>
        </Container>
    );
};

export default RecipeUpdate;