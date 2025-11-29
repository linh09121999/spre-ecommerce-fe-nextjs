import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type StoreCredit } from '../../interface/sendData/interfaceFlatform'

export const CreateAStoreCredit = (
    data: { store_credit: StoreCredit },
    paramsObj?: { include?: string }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/store_credits?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAStoreCredit = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/store_credits/${id}`);
}
export const ReturnAListOfStoreCredits = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_user_id_eq?: string,
        filter_created_by_id_eq?: string,
        filter_amount_gteq?: string,
        filter_currency_eq?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_user_id_eq) params.append("filter[user_id_eq]", paramsObj?.filter_user_id_eq);
    if (paramsObj?.filter_created_by_id_eq) params.append("filter[created_by_id_eq]", paramsObj?.filter_created_by_id_eq);
    if (paramsObj?.filter_amount_gteq) params.append("filter[amount_gteq]", paramsObj?.filter_amount_gteq);
    if (paramsObj?.filter_currency_eq) params.append("filter[currency_eq]", paramsObj?.filter_currency_eq);

    return api.get(`/platform/store_credits?${decodeURIComponent(params.toString())}`);
}
export const ReturnAStoreCredit = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/store_credits/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAStoreCredit = (data: { store_credit: StoreCredit }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/store_credits/${id}?${decodeURIComponent(params.toString())}`, data);
}