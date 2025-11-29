import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type LineItem, LineItemPost } from '../../interface/sendData/interfaceFlatform'

export const CreateALineItem = (data: { line_item: LineItemPost }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/line_items?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteALineItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/line_items/${id}`);
}
export const ReturnALineItem = (
    id: string,
    paramsObj?: { include?: string }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/line_items/${id}?${decodeURIComponent(params.toString())}`);
}
export const ReturnAListOfLineItems = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_order_id_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_order_id_eq) params.append("filter[order_id_eq]", paramsObj?.filter_order_id_eq);

    return api.get(`/platform/line_items?${decodeURIComponent(params.toString())}`);
}
export const UpdateALineItem = (data: { line_item: LineItem }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/line_items/${id}?${decodeURIComponent(params.toString())}`, data);
}
