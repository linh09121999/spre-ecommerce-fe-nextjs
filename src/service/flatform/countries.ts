import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ReturnsACountry = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/countries/${id}`);
}
export const ReturnsAListOfCountries = (): Promise<AxiosResponse> => {
    return api.get(`/platform/countries`);
}