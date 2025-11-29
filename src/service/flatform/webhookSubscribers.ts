import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Subscriber } from '../../interface/sendData/interfaceFlatform'

export const CreateAWebhookSubscriber = (data: { subscriber: Subscriber }): Promise<AxiosResponse> => {
    return api.post(`/platform/webhooks/subscribers`, data);
}
export const DeleteAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/webhooks/subscribers/${id}`);
}
export const ReturnAListOfWebhookSubscribers = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        filter_active_eq?: string,
        filter_url_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.filter_active_eq) params.append("filter[active_eq]", paramsObj?.filter_active_eq);
    if (paramsObj?.filter_url_cont) params.append("filter[url_cont]", paramsObj?.filter_url_cont);

    return api.get(`/platform/webhooks/subscribers?${decodeURIComponent(params.toString())}`);
}
export const ReturnAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/webhooks/subscribers/${id}`);
}
export const UpdateAWebhookSubscriber = (data: { subscriber: Subscriber }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/webhooks/subscribers/${id}`, data);
}