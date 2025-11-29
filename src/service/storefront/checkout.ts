import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type Checkout } from '../../interface/sendData/interfaceStorefront'

export const UpdateCheckOut = (
    data: { order: Checkout },
    paramsObj?: {
        include?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/storefront/checkout?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}

export const ValidateOrderPayment = (
    paramsObj?: {
        skip_state?: boolean,
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.skip_state) params.append("skip_state", String(paramsObj?.skip_state));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.post(`/storefront/checkout/validate_order_for_payment?${decodeURIComponent(params.toString())}`,{})
}
