import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const RetrieveAnOrderStatus = (
    order_number: number,
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);

    return api.get(`/storefront/order_status/${order_number}?${decodeURIComponent(params.toString())}`)
}
