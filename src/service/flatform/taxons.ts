import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Taxon, TaxonReposition } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxon = (data: { taxon: Taxon }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/taxons?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteATaxon = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/taxons/${id}`);
}
export const repositionATaxon = (data: { taxon: TaxonReposition }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/taxons/${id}/reposition`, data);
}
export const ReturnAListOfTaxons = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_taxonomy_id_eq?: string,
        filter_name_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_taxonomy_id_eq) params.append("filter[taxonomy_id_eq]", paramsObj?.filter_taxonomy_id_eq);
    if (paramsObj?.filter_name_cont) params.append("filter[name_cont]", paramsObj?.filter_name_cont);

    return api.get(`/platform/taxons?${decodeURIComponent(params.toString())}`);
}
export const ReturnATaxon = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/taxons/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateATaxon = (data: { taxon: Taxon }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/taxons/${id}?${decodeURIComponent(params.toString())}`, data);
}
