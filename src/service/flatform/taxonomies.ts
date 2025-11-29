import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Taxonomy } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxonomy = (data: { taxonomy: Taxonomy }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/taxonomies?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteATaxonomy = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/taxonomies/${id}`);
}
export const ReturnAListOfTaxonomies = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);

    return api.get(`/platform/taxonomies?${decodeURIComponent(params.toString())}`);
}
export const ReturnATaxonomy = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/taxonomies/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateATaxonomy = (data: { taxonomy: Taxonomy }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/taxonomies/${id}?${decodeURIComponent(params.toString())}`, data);
}