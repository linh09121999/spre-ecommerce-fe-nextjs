import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Classification } from '../../interface/sendData/interfaceFlatform'

export const ReturnAListOfClassifications = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_taxon_id_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_taxon_id_eq) params.append("filter[taxon_id_eq]", paramsObj?.filter_taxon_id_eq);

    return api.get(`/platform/classifications?${decodeURIComponent(params.toString())}`)
}



export const CreateAClassification = (data: { classification: Classification }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/classifications?${decodeURIComponent(params.toString())}`, data)
}


export const ReturnAClassification = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/classifications/${id}?${decodeURIComponent(params.toString())}`)
}

export const DeleteAClassification = (id: string): Promise<AxiosResponse> => api.delete(`/platform/classifications/${id}`)

export const UpdateAClassification = (data: { classification: Classification }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/classifications/${id}?${decodeURIComponent(params.toString())}`, data)
}