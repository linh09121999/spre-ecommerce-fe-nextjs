import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type DataFeed } from '../../interface/sendData/interfaceFlatform'


export const CreateADataFeed = (data: { data_feed: DataFeed }): Promise<AxiosResponse> => {
    return api.post(`/platform/data_feeds`, data);
}
export const DeleteADataFeed = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/data_feeds/${id}`);
}
export const ReturnADataFeed = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/data_feeds/${id}`);
}
export const ReturnAListOfDataFeeds = (
    paramsObj?: {
        page?: number,
        per_page?: number,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    return api.get(`/platform/data_feeds?${decodeURIComponent(params.toString())}`);
}
export const UpdateADataFeed = (data: { data_feed: DataFeed }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/data_feeds/${id}`, data);
}