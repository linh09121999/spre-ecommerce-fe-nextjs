import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type DigitalLink } from '../../interface/sendData/interfaceFlatform'

export const CreateADigitalLink = (
    data: { digital_link: DigitalLink }
): Promise<AxiosResponse> => {
    return api.post(`/platform/digital_links`, data);
}
export const DeleteADigitalLink = (
    id: string
): Promise<AxiosResponse> => {
    return api.delete(`/platform/digital_links/${id}`);
}
export const ReturnADigitalLink = (
    id: string
): Promise<AxiosResponse> => {
    return api.get(`/platform/digital_links/${id}`);
}
export const ReturnAListOfDigitalLinks = (
    paramsObj?: {
        page?: number,
        per_page?: number,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    return api.get(`/platform/digital_links?${decodeURIComponent(params.toString())}`);
}
export const UpdateADigitalLink = (
    data: { digital_link: DigitalLink },
    id: string
): Promise<AxiosResponse> => {
    return api.patch(`/platform/digital_links/${id}`, data);
}

export const ResetADigitalAsset = (
    id: string
): Promise<AxiosResponse> => {
    return api.patch(`/platform/digital_links/${id}/reset`,{});
}
