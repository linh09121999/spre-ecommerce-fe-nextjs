import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PaymentMethod } from '../../interface/sendData/interfaceFlatform'

export const CreateAPaymentMethod = (data: { payment_method: PaymentMethod }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/payment_methods?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPaymentMethod = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/payment_methods/${id}`);
}
export const ReturnAListOfPaymentMethods = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name) params.append("filter[name]", paramsObj?.filter_name);

    return api.get(`/platform/payment_methods?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPaymentMethod = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/payment_methods/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAPaymentMethod = (data: { payment_method: PaymentMethod }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/payment_methods/${id}?${decodeURIComponent(params.toString())}`, data);
}

