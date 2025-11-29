import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Wishlist } from '../../interface/sendData/interfaceFlatform'

export const CreateAWishlist = (data: { wishlist: Wishlist }, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.post(`/platform/wishlists?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAWishlist = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/wishlists/${id}`);
}
export const ReturnAListOfWishlists = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        include?: string,
        filter_name_cont?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.filter_name_cont) params.append("filter[name_cont]", paramsObj?.filter_name_cont);

    return api.get(`/platform/wishlists?${decodeURIComponent(params.toString())}`);
}
export const ReturnAWishlist = (id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/platform/wishlists/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAWishlist = (data: { wishlist: Wishlist }, id: string, paramsObj?: { include?: string }): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.patch(`/platform/wishlists/${id}?${decodeURIComponent(params.toString())}`, data);
}