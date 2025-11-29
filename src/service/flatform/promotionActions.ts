
import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PromotionActionRule, PromotionActionRuleUpdate } from '../../interface/sendData/interfaceFlatform'

export const CreateAPromotionAction = (data: { promotion_action: PromotionActionRule }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/promotion_actions?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPromotionAction = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/promotion_actions/${id}`);
}
export const ReturnAListOfPromotionActions = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_type_eq?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_type_eq) params.append("filter[type_eq]", paramsObj?.filter_type_eq);

    return api.get(`/platform/promotion_actions?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPromotionAction = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/promotion_actions/${id}?${decodeURIComponent(params.toString())}`);
}

export const UpdateAPromotionAction = (data: { promotion_action: PromotionActionRuleUpdate }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/promotion_actions/${id}?${decodeURIComponent(params.toString())}`, data);
}