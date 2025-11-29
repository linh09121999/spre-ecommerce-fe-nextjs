import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type WishedItem } from '../../interface/sendData/interfaceFlatform'

export const CreateAWishedItem = (data: { wished_item: WishedItem }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/wished_items?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAWishedItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/wished_items/${id}`);
}
export const ReturnAListOfWishedItems = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);

    return api.get(`/platform/wished_items?${decodeURIComponent(params.toString())}`);
}
export const ReturnAWishedItem = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/wished_items/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAWishedItem = (data: { wished_item: WishedItem }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/wished_items/${id}?${decodeURIComponent(params.toString())}`, data);
}