import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const ListShippingRates = (): Promise<AxiosResponse> => {
    return api.get(`/storefront/checkout/shipping_rates`)
}
export const SelectShippingMethodForShipments = (
    data: { shipping_method_id: string },
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);

    return api.patch(`/storefront/checkout/select_shipping_method?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}


