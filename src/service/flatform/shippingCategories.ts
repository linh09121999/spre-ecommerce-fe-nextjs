import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/sendData/interfaceFlatform'

export const CreateAShippingCategory = (data: { shipping_category: Name }): Promise<AxiosResponse> => {
    return api.post(`/platform/shipping_categories`, data);
}
export const DeleteAShippingCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/shipping_categories/${id}`);
}
export const ReturnAListOfShippingCategoryies = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        filter_name_i_cont?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.filter_name_i_cont) params.append("filter[name_i_cont]", paramsObj?.filter_name_i_cont);

    return api.get(`/platform/shipping_categories?${decodeURIComponent(params.toString())}`);
}
export const ReturnAShippingCategory = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/shipping_categories/${id}`);
}
export const UpdateAShippingCategory = (data: { shipping_category: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/shipping_categories/${id}`, data);
}