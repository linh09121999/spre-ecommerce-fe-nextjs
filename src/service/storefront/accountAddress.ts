import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type AddressInteface } from '../../interface/sendData/interfaceStorefront'

export const ListAccountAddress = (
    paramsObj?: {
        page: number;
        per_page: number;
        fields_address?: string,
        filter_exclude_quick_checkout?: boolean
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.fields_address) params.append("fields[address]", paramsObj?.fields_address);
    if (paramsObj?.filter_exclude_quick_checkout) params.append("filter[exclude_quick_checkout]", String(paramsObj?.filter_exclude_quick_checkout));

    return api.get(`/storefront/account/addresses?${decodeURIComponent(params.toString())}`);
}
export const CreateAccountAddress = (data: { address: AddressInteface }, paramsObj?: { fields_address?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.fields_address) params.append("fields[address]", paramsObj?.fields_address);
    return api.post(`/storefront/account/addresses?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
export const RemoveAnAddress = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/storefront/account/addresses/${id}`);
}
export const UpdateAnAddress = (data: { address: AddressInteface }, id: string, paramsObj?: { fields_address?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.fields_address) params.append("fields[address]", paramsObj?.fields_address);
    return api.patch(`/storefront/account/addresses/${id}?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
