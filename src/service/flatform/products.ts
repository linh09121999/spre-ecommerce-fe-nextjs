import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Product } from '../../interface/sendData/interfaceFlatform'

export const CreateAProduct = (data: { product: Product }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/products?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAProduct = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/products/${id}`);
}
export const ReturnAListOfProducts = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);

    return api.get(`/platform/products?${decodeURIComponent(params.toString())}`);
}
export const ReturnAProduct = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/products/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAProduct = (data: { product: Product }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/products/${id}?${decodeURIComponent(params.toString())}`, data);
}
