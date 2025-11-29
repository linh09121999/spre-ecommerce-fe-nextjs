import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type TaxCategory } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxCategory = (data: { tax_category: TaxCategory }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/tax_categories?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteATaxCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/tax_categories/${id}`);
}
export const ReturnAListOfTaxCategories = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name_eq?: string,
        filter_is_default_true?: string,
        filter_tax_code_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);
    if (paramsObj?.filter_is_default_true) params.append("filter[is_default_true]", paramsObj?.filter_is_default_true);
    if (paramsObj?.filter_tax_code_eq) params.append("filter[tax_code_eq]", paramsObj?.filter_tax_code_eq);

    return api.get(`/platform/tax_categories?${decodeURIComponent(params.toString())}`);
}
export const ReturnATaxCategory = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/tax_categories/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateATaxCategory = (data: { tax_category: TaxCategory }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/tax_categories/${id}?${decodeURIComponent(params.toString())}`, data);
}