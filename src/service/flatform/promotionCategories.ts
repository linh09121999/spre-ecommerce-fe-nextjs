import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PromotionCategory } from '../../interface/sendData/interfaceFlatform'

export const CreateAPromotionCategory = (data: { promotion_category: PromotionCategory }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/promotion_categories?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPromotionCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/promotion_categories/${id}`);
}
export const ReturnAListOfPromotionCategories = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_code_eq?: string,
        filter_name_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_code_eq) params.append("filter[code_eq]", paramsObj?.filter_code_eq);
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);

    return api.get(`/platform/promotion_categories?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPromotionCategory = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/promotion_categories/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAPromotionCategory = (data: { promotion_category: PromotionCategory }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/promotion_categories/${id}?${decodeURIComponent(params.toString())}`, data);
}