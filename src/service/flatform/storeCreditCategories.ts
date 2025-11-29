import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/sendData/interfaceFlatform'

export const CreateAStoreCreditCategory = (data: { store_credit_category: Name }): Promise<AxiosResponse> => {
    return api.post(`/platform/store_credit_categories`, data);
}
export const DeleteAStoreCreditCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/store_credit_categories/${id}`);
}
export const ReturnAListOfStoreCreditCategories = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        filter_name_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);

    return api.get(`/platform/store_credit_categories?${decodeURIComponent(params.toString())}`);
}
export const ReturnAStoreCreditCategory = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/store_credit_categories/${id}`);
}
export const UpdateAStoreCreditCategory = (data: { store_credit_category: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/store_credit_categories/${id}`, data);
}