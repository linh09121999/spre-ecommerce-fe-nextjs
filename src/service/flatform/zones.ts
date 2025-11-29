import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Zone } from '../../interface/sendData/interfaceFlatform'

export const CreateAZone = (data: { zone: Zone }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/zones?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAZone = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/zones/${id}`);
}
export const ReturnAListOfZones = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_description_eq?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_description_eq) params.append("filter[description_eq]", paramsObj?.filter_description_eq);

    return api.get(`/platform/zones?${decodeURIComponent(params.toString())}`);
}
export const ReturnAZone = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/zones/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAZone = (data: { zone: Zone }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/zones/${id}?${decodeURIComponent(params.toString())}`, data);
}