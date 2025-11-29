import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const AddStoreCredit = (
    paramsObj?: {
        amount?: string,
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.amount) params.append("amount", paramsObj?.amount);
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.post(`/storefront/checkout/add_store_credit?${decodeURIComponent(params.toString())}`)
}
export const RemoveStoreCredit = (
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.post(`/storefront/checkout/remove_store_credit?${decodeURIComponent(params.toString())}`)
}
