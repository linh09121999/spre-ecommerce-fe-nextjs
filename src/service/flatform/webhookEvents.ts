import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ReturnAListOfWebhookEvents = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name_eq?: string,
        filter_request_errors_cont?: string,
        filter_response_code_eq?: string,
        filter_success_eq?: string,
        filter_url_cont?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name_eq) params.append("filter[name_eq]", paramsObj?.filter_name_eq);
    if (paramsObj?.filter_request_errors_cont) params.append("filter[request_errors_cont]", paramsObj?.filter_request_errors_cont);
    if (paramsObj?.filter_response_code_eq) params.append("filter[response_code_eq]", paramsObj?.filter_response_code_eq);
    if (paramsObj?.filter_success_eq) params.append("filter[success_eq]", paramsObj?.filter_success_eq);
    if (paramsObj?.filter_url_cont) params.append("filter[url_cont]", paramsObj?.filter_url_cont);

    return api.get(`/platform/webhooks/events?${decodeURIComponent(params.toString())}`);
}