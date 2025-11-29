

import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

// payments
export const DeleteAPayment = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/payments/${id}`);
}
export const ReturnAListOfPayments = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_payment_method_id_eq?: string,
        filter_amount_gteq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_payment_method_id_eq) params.append("filter[payment_method_id_eq]", paramsObj?.filter_payment_method_id_eq);
    if (paramsObj?.filter_amount_gteq) params.append("filter[amount_gteq]", paramsObj?.filter_amount_gteq);

    return api.get(`/platform/payments?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPayment = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/payments/${id}?${decodeURIComponent(params.toString())}`);
}