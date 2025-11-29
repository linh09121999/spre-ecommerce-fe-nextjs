import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type OptionType } from '../../interface/sendData/interfaceFlatform'

export const CreateAnOptionValue = (data: { option_value: OptionType }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/option_values?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAnOptionValue = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/option_values/${id}`);
}
export const ReturnAListOfOptionValues = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_option_type_id_eq?: string,
        filter_name_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_option_type_id_eq) params.append("filter[option_type_id_eq]", paramsObj?.filter_option_type_id_eq);
    if (paramsObj?.filter_name_cont) params.append("filter[name_cont]", paramsObj?.filter_name_cont);
    return api.get(`/platform/option_values?${decodeURIComponent(params.toString())}`);
}
export const ReturnAnOptionValue = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/option_values/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAnOptionValue = (data: { option_value: OptionType }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/option_values/${id}?${decodeURIComponent(params.toString())}`, data);
}