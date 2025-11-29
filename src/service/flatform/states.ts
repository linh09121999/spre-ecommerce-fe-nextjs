import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ReturnsAListOfStates = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_country_id_eq?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_country_id_eq) params.append("filter[country_id_eq]", paramsObj?.filter_country_id_eq);

    return api.get(`/platform/states?${decodeURIComponent(params.toString())}`);
}
export const ReturnsAState = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/states/${id}`);
}