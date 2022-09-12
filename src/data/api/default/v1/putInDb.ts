import axios, {AxiosRequestConfig} from "axios";

interface Props {
    baseUrl: string;
    route: string;
    id: number;
    fetchOptions: AxiosRequestConfig;
}

export const PutInDb = ({baseUrl, route, id, fetchOptions}: Props): Promise<any> => {
    return axios(`${baseUrl}/${route}/${id}`, Object.assign({}, {method: "PUT"}, fetchOptions));
};