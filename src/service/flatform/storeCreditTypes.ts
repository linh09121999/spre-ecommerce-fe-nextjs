import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type StoreCreditType } from '../../interface/sendData/interfaceFlatform'

export const CreateAStoreCreditType = (data: { store_credit_type: StoreCreditType }): Promise<AxiosResponse> => {
    return api.post(`/platform/store_credit_types`, data);
}
export const DeleteAStoreCreditType = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/store_credit_types/${id}`);
}
export const ReturnAListOfStoreCreditTypes = (
    paramsObj?: {
        page?: number,
        per_page?: number
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    return api.get(`/platform/store_credit_types?${decodeURIComponent(params.toString())}`);
}
export const ReturnAStoreCreditType = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/store_credit_types/${id}`);
}
export const UpdateAStoreCreditType = (data: { store_credit_type: StoreCreditType }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/store_credit_types/${id}`, data);
}