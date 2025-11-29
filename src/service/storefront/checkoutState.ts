import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const AdvanceCheckout = (
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.patch(`/storefront/checkout/advance?${decodeURIComponent(params.toString())}`,{})
}
export const ComplateCheckout = (
    paramsObj?: {
        include?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/storefront/checkout/complete?${decodeURIComponent(params.toString())}`,{})
}
export const NextCheckoutStep = (
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.patch(`/storefront/checkout/next?${decodeURIComponent(params.toString())}`,{})
}
