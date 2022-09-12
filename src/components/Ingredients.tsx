import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    CheckPicker,
    Container,
    Content,
    Divider,
    Footer,
    Input,
    InputGroup, SelectPicker
} from "rsuite";
import useCSS from "../hooks/useCSS";
import {Db} from "../../types/Db";

interface Props {
    ingredientsStore: NonNullable<Db.Ingredients>;
    ingredientsInRecipes: { [ingredientId: number]: boolean };
    saveIngredient: (ingredient: Db.Ingredient, isNew: boolean) => void;
    deleteIngredient: (id: number) => void;
}

interface LocalIngredient extends Db.Ingredient {
    isNew?: boolean;
}

enum MeasuresEnum {
    "gr" = "gr",
    "tsp" = "tsp",
    "cup" = "cup",
    "piece" = "piece",
    "ml" = "ml"
}

const Ingredients = (
    {
        ingredientsStore,
        ingredientsInRecipes,
        saveIngredient,
        deleteIngredient
    }: Props): React.ReactElement => {

    const [localIngredientsStore, setLocalIngredientsStore] = useState(ingredientsStore as LocalIngredient[]);
    const [measures] = useState(Object.values(MeasuresEnum).map(measure => ({label: measure, value: measure})));

    const [css] = useCSS();

    return (
        <Container>
            <Content>
                <label><b>The Ingredients Store:</b></label>
                <br/><br/>
                {localIngredientsStore.map(({id, name, measure, isNew = false}, index) => {
                    const _LocalIngredientsStore = [...localIngredientsStore];
                    const {name: cleanName, measure: cleanMeasure} = ingredientsStore.find(({id: cleanId}) => id === cleanId) || {};
                    const saveDisabled = name === '' || (name === cleanName && measure === cleanMeasure);

                    return [
                        <InputGroup key={`__key_store_inputGroup_${index}`}>
                            <InputGroup.Addon style={{width: 75, backgroundColor: "lavender"}}>{id}</InputGroup.Addon>
                            <InputGroup.Addon style={{width: 200}}>Name:</InputGroup.Addon>
                            <Input placeholder="(characters only)" value={name}
                                   onChange={value => {
                                       if (/^[A-Za-z]+$/.test(value)) {
                                           _LocalIngredientsStore[index] = {id, name: value, measure, isNew};
                                           setLocalIngredientsStore([..._LocalIngredientsStore]);
                                       }
                                   }}/>
                            <InputGroup.Addon style={{width: 150}}>Measure:</InputGroup.Addon>
                            <SelectPicker className={css('measuresToggle')} cleanable={false} data={measures}
                                          value={measure}
                                          onChange={value => {
                                              _LocalIngredientsStore[index] = {id, name, measure: value, isNew};
                                              setLocalIngredientsStore([..._LocalIngredientsStore]);
                                          }}/>
                            <InputGroup.Button color="green" appearance="primary" disabled={saveDisabled} onClick={() => {
                                saveIngredient({id, name, measure}, isNew);
                            }}>Save</InputGroup.Button>
                            <InputGroup.Button
                                color="red" appearance="primary" disabled={ingredientsInRecipes[id]}
                                onClick={() => {
                                    _LocalIngredientsStore.splice(index, 1);
                                    setLocalIngredientsStore([..._LocalIngredientsStore]);
                                    if (!isNew) {
                                        deleteIngredient(id)
                                    }
                                }}>Delete</InputGroup.Button>
                        </InputGroup>,
                        <br key={`__key_store_lineBreak_${index}`}/>
                    ];
                })}
            </Content>
            <Footer>
                <ButtonToolbar>
                    <Button color="yellow" appearance="primary" onClick={() => {
                        setLocalIngredientsStore([
                            ...localIngredientsStore,
                            {
                                id: Math.max(...localIngredientsStore.map(({id}) => id)) + 1,
                                name: '',
                                measure: MeasuresEnum.gr,
                                isNew: true
                            }
                        ]);
                    }}>Add new ingredient</Button>
                </ButtonToolbar>
            </Footer>
        </Container>
    );
};

export default Ingredients;