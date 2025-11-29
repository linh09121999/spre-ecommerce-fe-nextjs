import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type TaxRate } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxRate = (data: { tax_rate: TaxRate }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/tax_rates?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteATaxRate = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/tax_rates/${id}`);
}
export const ReturnAListOfTaxRates = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_zone_id_eq?: string,
        filter_amount_gt?: string,
        filter_tax_category_id_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_zone_id_eq) params.append("filter[zone_id_eq]", paramsObj?.filter_zone_id_eq);
    if (paramsObj?.filter_amount_gt) params.append("filter[amount_gt]", paramsObj?.filter_amount_gt);
    if (paramsObj?.filter_tax_category_id_eq) params.append("filter[tax_category_id_eq]", paramsObj?.filter_tax_category_id_eq);

    return api.get(`/platform/tax_rates?${decodeURIComponent(params.toString())}`);
}
export const ReturnATaxRate = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/tax_rates/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateATaxRate = (data: { tax_rate: TaxRate }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/tax_rates/${id}?${decodeURIComponent(params.toString())}`, data);
}