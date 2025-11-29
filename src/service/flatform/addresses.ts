import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Address } from '../../interface/sendData/interfaceFlatform'

export const ReturnAListOfAddresses = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_user_id_eq?: string,
        filter_firstname_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_user_id_eq) params.append("filter[user_id_eq]", paramsObj?.filter_user_id_eq);
    if (paramsObj?.filter_firstname_cont) params.append("filter[firstname_cont]", paramsObj?.filter_firstname_cont);

    return api.get(`/platform/addresses?${decodeURIComponent(params.toString())}`);
}

export const CreateAnAddress = (
    data: { address: Address },
    paramsObj?: {
        include?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/addresses?${decodeURIComponent(params.toString())}`, data);
};

export const ReturnAnAddress = (
    id: string,
    paramsObj?: { include?: string }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/addresses/${id}?${decodeURIComponent(params.toString())}`)
}

export const DeleteAnAddress = (id: string): Promise<AxiosResponse> => api.delete(`/platform/addresses/${id}`)

export const UpdateAnAddress = (data: { address: Address }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/addresses/${id}?${decodeURIComponent(params.toString())}`, data)
}