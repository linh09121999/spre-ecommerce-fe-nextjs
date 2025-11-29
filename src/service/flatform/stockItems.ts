import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type StockItem } from '../../interface/sendData/interfaceFlatform'

export const CreateAStockItem = (data: { stock_item: StockItem }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/stock_items?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAStockItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/stock_items/${id}`);
}
export const ReturnAListOfStockItems = (
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
    return api.get(`/platform/stock_items?${decodeURIComponent(params.toString())}`);
}
export const ReturnAStockItem = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/stock_items/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAStockItem = (data: { stock_item: StockItem }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/stock_items/${id}?${decodeURIComponent(params.toString())}`, data);
}