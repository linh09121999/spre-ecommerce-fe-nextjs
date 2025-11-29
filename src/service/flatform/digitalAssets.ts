import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const CreateADigitalAsset = (
    variantId: number,
    file: string,
    paramsObj?: {
        include?: string,
    }): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("digital[variant_id]", String(variantId));
    formData.append("digital[attachment]", file);

    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/digitals?${decodeURIComponent(params.toString())}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export const DeleteADigitalAsset = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/digitals/${id}`);
}

export const ReturnADigitalAsset = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/digitals/${id}?${decodeURIComponent(params.toString())}`);
}
export const ReturnAListOfDigitalAssets = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/digitals?${decodeURIComponent(params.toString())}`);
}
export const UpdateADigitalAsset = (
    variantId: number,
    file: string,
    id: string,
    paramsObj?: {
        include?: string
    }
): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("digital[variant_id]", String(variantId));
    formData.append("digital[attachment]", file);

    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/digitals/${id}?${decodeURIComponent(params.toString())}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}