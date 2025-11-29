import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ListAllOrders = (
    paramsObj?: {
        include?: string,
        fields_cart?: string,
        page?: number,
        per_page?: number
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));

    return api.get(`/storefront/account/orders?${decodeURIComponent(params.toString())}`);
}
export const RetriebeAnOrder = (
    order_number: number,
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart)

    return api.get(`/storefront/account/orders/${order_number}?${decodeURIComponent(params.toString())}`);
}
