import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Order } from '../../interface/sendData/interfaceFlatform'

export const AdvancesAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/advance?${decodeURIComponent(params.toString())}`,{});
}
export const ApplyCouponCodeForAnOrder = (data: { coupon_code: string }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/apply_coupon_code?${decodeURIComponent(params.toString())}`, data);
}
export const ApprovesAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/approve?${decodeURIComponent(params.toString())}`,{});
}
export const CancelsAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/cancel?${decodeURIComponent(params.toString())}`,{});
}
export const CompletesAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/complete?${decodeURIComponent(params.toString())}`,{});
}

export const CreatesAnOrder = (data: { order: Order }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/orders?${decodeURIComponent(params.toString())}`);
}
export const DeleteAnOrder = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/orders/${id}`);
}
export const EmptiesAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/empty?${decodeURIComponent(params.toString())}`,{});
}
export const NextAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/next?${decodeURIComponent(params.toString())}`,{});
}
export const ReturnAListOfOrders = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_state_eq?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_state_eq) params.append("filter[state_eq]]", paramsObj?.filter_state_eq);

    return api.get(`/platform/orders?${decodeURIComponent(params.toString())}`);
}
export const ReturnAnOrder = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/orders/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAnOrder = (data: { order: Order }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}?${decodeURIComponent(params.toString())}`, data);
}
export const UseStoreCreditForAnOrder = (data: { amount: number }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/orders/${id}/use_store_credit?${decodeURIComponent(params.toString())}`, data);
}