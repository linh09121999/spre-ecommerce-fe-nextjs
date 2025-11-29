import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Promotion } from '../../interface/sendData/interfaceFlatform'

export const CreateAPromotion = (data: { promotion: Promotion }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/promotions?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPromotion = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/promotions/${id}`);
}
export const ReturnAListOfPromotions = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_code_eq?: string,
        filter_name_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_code_eq) params.append("filter[code_eq]", paramsObj?.filter_code_eq);
    if (paramsObj?.filter_name_cont) params.append("filter[name_cont]", paramsObj?.filter_name_cont);

    return api.get(`/platform/promotions?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPromotion = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/promotions/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAPromotion = (data: { promotion: Promotion }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/promotions/${id}?${decodeURIComponent(params.toString())}`, data);
}