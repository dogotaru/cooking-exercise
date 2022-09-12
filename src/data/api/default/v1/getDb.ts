import axios, {AxiosRequestConfig} from "axios";

interface Props {
    baseUrl: string;
    route: string;
    fetchOptions: AxiosRequestConfig;
}

export const GetDb = ({baseUrl, route, fetchOptions}: Props): Promise<any> => {
    return axios(`${baseUrl}/${route}`, Object.assign({}, {method: "GET"}, fetchOptions));
};