import React, {useEffect, useRef, useState} from "react";
import {Db} from "../../types/Db";
import {
    Button,
    ButtonToolbar,
    CheckPicker,
    Container,
    Content,
    Divider,
    Footer,
    Input,
    InputGroup, Popover,
    Progress
} from "rsuite";
import {Download} from "@rsuite/icons/es/icons/legacy";
import useCSS from "../hooks/useCSS";

interface Props {
    recipe: Db.Recipe;
    ingredientsStore: NonNullable<Db.Ingredients>;
    fridge: NonNullable<Db.Fridge>;
    id: number;
    substractFromFridge: (ingredientsInRecipe: Db.IngredientsInRecipe) => void
}

const RecipeCook = ({id, recipe, ingredientsStore, fridge, substractFromFridge}: Props): React.ReactElement => {

    const {recipeName = '', duration = 0, ingredients: ingredientsInRecipe = []} = recipe;
    const [cookingProgress, setCookingProgress] = useState(0);
    const [cookingIngredientsId, setCookingIngredientsId] = useState([] as number[]);
    const [ingredientsIdsInRecipe, setInputIngredients] = useState(ingredientsInRecipe.map(({ingredientId}) => ingredientId));
    const [recipeBurned, setRecipeBurned] = useState(false);

    const stopCookingTimer = useRef(false)

    useEffect(() => {
        const cookingTimer = (seconds: number, totalSeconds: number) => {

            if (stopCookingTimer.current)
                setTimeout(() => {
                    setCookingProgress(0);
                }, 500)
            else if (cookingIngredientsId.length && seconds > 0 && cookingProgress < 100) {
                seconds--;
                setCookingProgress(Math.floor((totalSeconds - seconds) * 100 / totalSeconds));
                setTimeout(() => cookingTimer(seconds, totalSeconds), 1000)
            }
        }
        if (cookingIngredientsId.length === ingredientsInRecipe.length) {
            substractFromFridge(ingredientsInRecipe);
            cookingTimer(duration, duration);
            stopCookingTimer.current = false;
            setRecipeBurned(false);
        }
    }, [cookingIngredientsId])

    useEffect(() => {
        if (cookingProgress === 100) {
            setTimeout(() => {
                if (!stopCookingTimer.current)
                    setRecipeBurned(true)
            }, 2000)
        }
    }, [cookingProgress])

    useEffect(() => {

        return () => {
            setCookingIngredientsId([]);
            setCookingProgress(100);
            stopCookingTimer.current = true;
            setRecipeBurned(false)
        }
    }, [])

    const [css] = useCSS();

    return (
        <Container>
            <Content>
                {recipeBurned && <Popover>Burned</Popover>}
                <label><b>Recipe:</b> {recipeName}, ready in {duration}s</label>
                <br/><br/>
                {ingredientsIdsInRecipe.map((_id, index) => {

                    const {
                        id,
                        name,
                        measure
                    } = ingredientsStore.find(({id: ingredientId}) => _id === ingredientId) as Db.Ingredient;
                    const {quantity} = ingredientsInRecipe.find(({ingredientId}) => _id === ingredientId) as Db.IngredientInRecipeItem;
                    const {availableQuantity = 0} = fridge.find(({ingredientId}) => _id === ingredientId) as Db.IngredientInFridgeItem || {};
                    const availableInFridge = parseFloat(`${quantity}`) > parseFloat(`${availableQuantity}`);

                    return [
                        <InputGroup key={`__key_inputGroup_${index}`}>
                            <InputGroup.Button
                                color="blue" appearance="primary"
                                disabled={availableInFridge} onClick={() => {

                                if (!cookingIngredientsId.includes(_id))
                                    setCookingIngredientsId([...cookingIngredientsId, _id])
                            }}><Download/><Divider vertical/>Add to cooker</InputGroup.Button>
                            <Input placeholder="(digits only)" value={`${name} | need ${quantity} ${measure}`}/>
                            <InputGroup.Addon style={{
                                width: 200,
                                backgroundColor: availableInFridge ? 'orangered' : 'palegreen'
                            }}>Is {availableInFridge ? "not" : ""} available in
                                fridge:</InputGroup.Addon>
                            <InputGroup.Addon style={{width: 120}}>{availableQuantity}{measure}</InputGroup.Addon>
                        </InputGroup>,
                        <br key={`__key_lineBreak_${index}`}/>
                    ]
                })}
                <label><b>Kitchen cooker:</b></label>
                <br/><br/>
                <Progress.Line
                    percent={cookingProgress}
                    strokeColor={recipeBurned ? 'red' : cookingProgress === 100 ? 'green' : 'blue'}
                    status={recipeBurned ? "fail" : cookingProgress === 100 ? 'success' : undefined}/>
                <br/>
                {cookingIngredientsId.map((_id, index) => {
                    const {
                        name,
                        measure
                    } = ingredientsStore.find(({id: ingredientId}) => _id === ingredientId) as Db.Ingredient;
                    const {quantity} = ingredientsInRecipe.find(({ingredientId}) => _id === ingredientId) as Db.IngredientInRecipeItem;
                    return <div key={`__key_cooker_${index}`}>- {quantity} {measure} of {name}<br/></div>
                })}
            </Content>
            <Footer>
                <ButtonToolbar>
                    <Button color="yellow" appearance="primary"
                            disabled={recipeBurned || cookingProgress < 90 || !cookingIngredientsId.length}
                            onClick={() => {
                                setCookingIngredientsId([]);
                                setCookingProgress(0);
                                stopCookingTimer.current = true;
                            }}>Eat now</Button>
                </ButtonToolbar>
            </Footer>
        </Container>
    );
};

export default RecipeCook;