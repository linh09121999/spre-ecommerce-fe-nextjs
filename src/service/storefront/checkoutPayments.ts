import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type CheckoutPayment } from '../../interface/sendData/interfaceStorefront'

export const CreateNewPayment = (
    data: CheckoutPayment,
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);

    return api.post(`/storefront/checkout/create_payment?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
export const ListPaymentMethods = (): Promise<AxiosResponse> => {
    return api.get(`/storefront/checkout/payment_methods`)
}
