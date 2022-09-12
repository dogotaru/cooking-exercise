import {GetDb} from "../api/default/v1/getDb";
import {dbBaseUrl} from "../../../config/Configuration";
import {DeleteInDb} from "../api/default/v1/deleteInDb";
import {Db} from "../../../types/Db";
import {PostInDb} from "../api/default/v1/postInDb";
import {PutInDb} from "../api/default/v1/putInDb";

export async function putInDb(route: "recipes" | "fridge" | "ingredients", ingredient: Db.Ingredient | Db.Recipe | Db.IngredientInFridgeItem): Promise<any> {
    let returnData: any = null;
    await PutInDb({
        baseUrl: dbBaseUrl, route, id: ingredient.id, fetchOptions: {
            data: ingredient,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
        .then(async ({data, status = ""}) => {

            if (status !== 200) {

                const awaitData = await data;
                const {
                    bodyUsed = '',
                    headers = '',
                    ok = '',
                    redirected = '',
                    status = '',
                    statusText = '',
                    type = '',
                    url = ''
                } = data;
                throw {
                    processedData: {bodyUsed, headers, ok, redirected, status, statusText, type, url},
                    awaitData,
                    data
                }
            }

            return data
        })
        .then(data => {
            returnData = data
        })
        .catch(error => {

            throw {origin: 'postInDb', error};
        });

    return returnData;
}

export async function postInDb(route: "recipes" | "fridge" | "ingredients", ingredient: Db.Ingredient | Db.Recipe | Db.IngredientInFridgeItem): Promise<any> {
    let returnData: any = null;
    await PostInDb({
        baseUrl: dbBaseUrl, route, fetchOptions: {
            data: ingredient,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    })
        .then(async ({data, status = ""}) => {

            if (status !== 201) {

                const awaitData = await data;
                const {
                    bodyUsed = '',
                    headers = '',
                    ok = '',
                    redirected = '',
                    status = '',
                    statusText = '',
                    type = '',
                    url = ''
                } = data;
                throw {
                    processedData: {bodyUsed, headers, ok, redirected, status, statusText, type, url},
                    awaitData,
                    data
                }
            }

            return data
        })
        .then(data => {
            returnData = data
        })
        .catch(error => {

            throw {origin: 'postInDb', error};
        });

    return returnData;
}

export async function deleteInDb(route: "recipes" | "fridge" | "ingredients", id: number): Promise<any> {
    let returnData: any = null;
    await DeleteInDb({
        baseUrl: dbBaseUrl, route, id, fetchOptions: {
            // headers: {
            // }
        }
    })
        .then(async ({data, status = ""}) => {

            if (status !== 200) {

                const awaitData = await data;
                const {
                    bodyUsed = '',
                    headers = '',
                    ok = '',
                    redirected = '',
                    status = '',
                    statusText = '',
                    type = '',
                    url = ''
                } = data;
                throw {
                    processedData: {bodyUsed, headers, ok, redirected, status, statusText, type, url},
                    awaitData,
                    data
                }
            }

            return data
        })
        .then(data => {
            returnData = data
        })
        .catch(error => {

            throw {origin: 'deleteInDb', error};
        });

    return returnData;
}

export async function getDb(route: "recipes" | "fridge" | "ingredients"): Promise<any> {

    let returnData: any = null;
    await GetDb({
        baseUrl: dbBaseUrl, route, fetchOptions: {
            // headers: {
            // }
        }
    })
        .then(async ({data, status = ""}) => {

            if (status !== 200) {

                const awaitData = await data;
                const {
                    bodyUsed = '',
                    headers = '',
                    ok = '',
                    redirected = '',
                    status = '',
                    statusText = '',
                    type = '',
                    url = ''
                } = data;
                throw {
                    processedData: {bodyUsed, headers, ok, redirected, status, statusText, type, url},
                    awaitData,
                    data
                }
            }

            return data
        })
        .then(data => {
            returnData = data
        })
        .catch(error => {

            throw {origin: 'getDb', error};
        });

    return returnData;
}