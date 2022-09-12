import React from "react";
import {Db} from "../../types/Db";
import {
    Button,
    ButtonToolbar,
    Container,
    Content,
    Divider,
    Dropdown, Footer,
    Header,
    IconButton,
    Popover,
    Table,
    TableCellProps,
    Whisper
} from "rsuite";
import {More} from "@rsuite/icons";
import ClockO from "@rsuite/icons/legacy/ClockO";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import useCSS from "../hooks/useCSS";

interface Props {
    recipes: Db.Recipes,
    deleteRecipe: (id: number) => void
}

interface RecipeWithLength extends Db.Recipe {
    ingredientsLength: number;
}

const Recipes = ({recipes, deleteRecipe}: Props): React.ReactElement => {

    let {path, url} = useRouteMatch();
    let history = useHistory();
    const [css] = useCSS();

    return <Container>
        <Content>
            <Table
                height={300}
                data={(recipes || []).map((recipe): RecipeWithLength => ({
                    ...recipe,
                    ingredientsLength: recipe.ingredients.length
                }))} id="table">
                <Table.Column flexGrow={70}>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.Cell dataKey={'id'} />
                </Table.Column>

                <Table.Column flexGrow={200}>
                    <Table.HeaderCell>Recipe Name</Table.HeaderCell>
                    <Table.Cell dataKey={'recipeName'} />
                </Table.Column>

                <Table.Column flexGrow={300}>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.Cell dataKey={'duration'} />
                </Table.Column>

                <Table.Column flexGrow={150} fixed="right">
                    <Table.HeaderCell>Ingredients Count</Table.HeaderCell>
                    <Table.Cell dataKey={'ingredientsLength'} />
                </Table.Column>

                <Table.Column flexGrow={200}>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.Cell>
                        {({id}: RecipeWithLength, rowIndex: number) => {
                            return (
                                <>
                                    <Link to={`${path}/update/${id}`}>Update</Link>
                                    <Divider vertical/>
                                    <Link onClick={event => {
                                        event.preventDefault();
                                        deleteRecipe(id);
                                    }} to={`${path}`}>Delete</Link>
                                    <Divider vertical/>
                                    <Link to={`${path}/cook/${id}`}>Cook now</Link>
                                </>
                            );
                        }}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </Content>
        <Footer>
            <ButtonToolbar>
                <Button color="yellow" appearance="primary" onClick={() => {
                    history.push(`${url}/add`)
                }}>Add New Recipe</Button>
            </ButtonToolbar>
        </Footer>
    </Container>
};

export default Recipes;