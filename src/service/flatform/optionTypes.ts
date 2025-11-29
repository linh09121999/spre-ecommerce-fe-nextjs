import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type OptionType } from '../../interface/sendData/interfaceFlatform'

export const CreateAnOptionType = (data: { option_type: OptionType }): Promise<AxiosResponse> => {
    return api.post(`/platform/option_types`, data);
}
export const DeleteAnOptionType = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/option_types/${id}`);
}
export const ReturnAListOfOptionTypes = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        filter_option_type_id_eq?: string,
        filter_name_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.filter_option_type_id_eq) params.append("filter[option_type_id_eq]", paramsObj?.filter_option_type_id_eq);
    if (paramsObj?.filter_name_cont) params.append("filter[name_cont]", paramsObj?.filter_name_cont);
    return api.get(`/platform/option_types?${decodeURIComponent(params.toString())}`);
}
export const ReturnAnOptionType = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/option_types/${id}`);
}
export const UpdateAnOptionType = (data: { option_type: OptionType }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/option_types/${id}`, data);
}