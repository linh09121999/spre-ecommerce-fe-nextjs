import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ListAllCreditCards = (
    paramsObj?: {
        filter_payment_method_id?: string,
        include?: string,
        filter_credit_card?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.filter_payment_method_id) params.append("filter[payment_method_id]", paramsObj?.filter_payment_method_id);
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_credit_card) params.append("filter[credit_card]", paramsObj?.filter_credit_card);

    return api.get(`/storefront/account/credit_cards?${decodeURIComponent(params.toString())}`);
}
export const RemoveACreditCard = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/storefront/account/credit_cards/${id}`);
}
export const RetrieveTheDefaultCreditCard = (
    paramsObj?: {
        include?: string,
        filter_credit_card?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_credit_card) params.append("filter[credit_card]", paramsObj?.filter_credit_card);

    return api.get(`/storefront/account/credit_cards/default?${decodeURIComponent(params.toString())}`);
}
