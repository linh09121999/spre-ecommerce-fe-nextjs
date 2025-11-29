import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type ShippingMethod } from '../../interface/sendData/interfaceFlatform'

export const CreateAShippingMethod = (data: { shipping_method: ShippingMethod }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/shipping_methods?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAShippingMethod = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/shipping_methods/${id}`);
}
export const ReturnAListOfShippingMethods = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name?: string,
        filter_title_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name) params.append("filter[name]", paramsObj?.filter_name);
    if (paramsObj?.filter_title_cont) params.append("filter[title_cont]", paramsObj?.filter_title_cont);

    return api.get(`/platform/shipping_methods?${decodeURIComponent(params.toString())}`);
}
export const ReturnAShippingMethod = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/shipping_methods/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAShippingMethod = (data: { shipping_method: ShippingMethod }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/shipping_methods/${id}?${decodeURIComponent(params.toString())}`, data);
}