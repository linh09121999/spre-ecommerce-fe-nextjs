import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type StockLocation } from '../../interface/sendData/interfaceFlatform'

export const CreateAStockLocation = (
    data: { stock_location: StockLocation },
    paramsObj?: { include?: string }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/stock_locations?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAStockLocation = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/stock_locations/${id}`);
}
export const ReturnAListOfStockLocations = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);

    return api.get(`/platform/stock_locations?${decodeURIComponent(params.toString())}`);
}
export const ReturnAStockLocation = (
    id: string,
    paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/stock_locations/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAStockLocation = (
    data: { stock_location: StockLocation },
    id: string,
    paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/stock_locations/${id}?${decodeURIComponent(params.toString())}`, data);
}