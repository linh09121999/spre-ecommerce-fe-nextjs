import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const DeleteAVariant = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/variants/${id}`);
}
export const ReturnAListOfVariants = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_product_id_eq?: string,
        filter_sku_i_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_product_id_eq) params.append("filter[product_id_eq]", paramsObj?.filter_product_id_eq);
    if (paramsObj?.filter_sku_i_cont) params.append("filter[sku_i_cont]", paramsObj?.filter_sku_i_cont);

    return api.get(`/platform/variants?${decodeURIComponent(params.toString())}`);
}
export const ReturnAVariant = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/variants/${id}?${decodeURIComponent(params.toString())}`);
}