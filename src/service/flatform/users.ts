import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type User } from '../../interface/sendData/interfaceFlatform'

export const CreateAUser = (data: { user: User }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/users?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAUser = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/users/${id}`);
}
export const ReturnAListOfUsers = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_user_id_eq?: string,
        filter_email_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_user_id_eq) params.append("filter[user_id_eq]", paramsObj?.filter_user_id_eq);
    if (paramsObj?.filter_email_cont) params.append("filter[email_cont]", paramsObj?.filter_email_cont);

    return api.get(`/platform/users?${decodeURIComponent(params.toString())}`);
}
export const ReturnAUser = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/users/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAUser = (data: { user: User }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/users/${id}?${decodeURIComponent(params.toString())}`, data);
}