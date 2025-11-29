import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Adjustment } from '../../interface/sendData/interfaceFlatform'

export const ReturnAListOfAdjustments = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_order_id?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_order_id) params.append("filter[order_id]", paramsObj?.filter_order_id);
    return api.get(`/platform/adjustments?${decodeURIComponent(params.toString())}`)
}



export const CreateAnAdjustment = (data: { adjustment: Adjustment },
    paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/adjustments?${decodeURIComponent(params.toString())}`, data)
}

export const ReturnAnAdjustment = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/adjustments/${id}?${decodeURIComponent(params.toString())}`)
}

export const DeleteAnAdjustment = (id: string): Promise<AxiosResponse> => api.delete(`/platform/adjustments/${id}`)

export const UpdateAnAdjustment = (data: { adjustment: Adjustment }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/adjustments/${id}?${decodeURIComponent(params.toString())}`, data)
}