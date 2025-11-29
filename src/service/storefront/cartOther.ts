import apiOrderToken from "../../api/apiOrderToken";
import api from "../../api/apiAuthorization";

import { type AxiosResponse } from "axios";

export const AssociateACartWithAUser = (
    paramsObj?: {
        guest_order_token?: string,
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.guest_order_token) params.append("guest_order_token", paramsObj?.guest_order_token);
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.patch(`/storefront/cart/associate?${decodeURIComponent(params.toString())}`,{})
}
export const ChangeCartCurrency = (
    paramsObj?: {
        new_currency?: string,
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.new_currency) params.append("new_currency", paramsObj?.new_currency);
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return apiOrderToken.patch(`/storefront/cart/change_currency?${decodeURIComponent(params.toString())}`)
}
export const EmptyTheCart = (
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return apiOrderToken.patch(`/storefront/cart/empty?${decodeURIComponent(params.toString())}`,{})
}
export const ListEstimatedShippingRates = (
    paramsObj?: {
        country_iso?: string,
        fields_shipping_rate?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.country_iso) params.append("country_iso", paramsObj?.country_iso);
    if (paramsObj?.fields_shipping_rate) params.append("fields[shipping_rate]", paramsObj?.fields_shipping_rate);
    return apiOrderToken.get(`/storefront/cart/estimate_shipping_rates?${decodeURIComponent(params.toString())}`,{})
}
