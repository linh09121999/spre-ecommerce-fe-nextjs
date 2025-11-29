import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Vendor } from '../../interface/sendData/interfaceFlatform'


export const ReturnAListOfVendors = (
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
    return api.get(`/platform/vendors?${decodeURIComponent(params.toString())}`);
}

export const CreateAVendor = (data: Vendor, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/vendors?${decodeURIComponent(params.toString())}`, data);
}

export const DeleteAVendor = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/vendors/${id}`);
}

export const UpdateAVendor = (data: Vendor, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}?${decodeURIComponent(params.toString())}`, data);
}

export const ApprovesVendor = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/approve?${decodeURIComponent(params.toString())}`,{});
}
export const completesOnboardingProcess = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/complete_onboarding?${decodeURIComponent(params.toString())}`);
}

export const InvitesVendorToThePlatform = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/invite?${decodeURIComponent(params.toString())}`,{});
}
export const rejectsVendor = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/reject?${decodeURIComponent(params.toString())}`,{});
}

export const ReturnAVendor = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/vendors/${id}?${decodeURIComponent(params.toString())}`);
}
export const StartOnboardingProcess = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/start_onboarding?${decodeURIComponent(params.toString())}`,{});
}
export const suspendsVendor = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/vendors/${id}/suspend?${decodeURIComponent(params.toString())}`,{});
}
