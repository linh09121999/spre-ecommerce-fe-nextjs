import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type PaymentSession } from '../../interface/sendData/interfaceStorefront'

export const CreateAnAdyenPaymentSession = (
    data: { payment_session: PaymentSession }
): Promise<AxiosResponse> => {
    return api.post(`/storefront/adyen/payment_sessions`, data)
}
export const GetAdyenPaymentSession = (id: string): Promise<AxiosResponse> => {
    return api.get(`/storefront/adyen/payment_sessions/${id}`)
}
