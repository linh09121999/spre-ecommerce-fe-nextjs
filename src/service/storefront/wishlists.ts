import apiAuthorization from "../../api/apiAuthorization";
import apiCreateAWishlist from "../../api/apiCreateAWishlist"
import { type AxiosResponse } from "axios";
import { type WishlistCreate, WishlistCreateUpdate } from '../../interface/sendData/interfaceStorefront'

export const ListAllWishlists = (
    paramsObj?: {
        include?: string,
        fields_wishlist?: string,
        per_page?: number,
        is_variant_included?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_wishlist) params.append("fields[wishlist]", paramsObj?.fields_wishlist);
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.is_variant_included) params.append("is_variant_included", paramsObj?.is_variant_included);

    return apiAuthorization.get(`/storefront/wishlists?${decodeURIComponent(params.toString())}`)
}

export const CreateAWishlist = (
    data: WishlistCreate,
    paramsObj?: {
        fields_wishlist?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.fields_wishlist) params.append("fields[wishlist]", paramsObj?.fields_wishlist);

    return apiAuthorization.post(`/storefront/wishlists?${decodeURIComponent(params.toString())}`, data) //gom ca apiOrderToken, apiOrderToken
}
export const DeleteAWishlist = (token: string) => apiAuthorization.delete(`/storefront/wishlists/${token}`)
export const RetrieveAWishlist = (
    token: string,
    paramsObj?: {
        include?: string,
        fields_wishlist?: string,
        per_page?: number,
        is_variant_included?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_wishlist) params.append("fields[wishlist]", paramsObj?.fields_wishlist);
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.is_variant_included) params.append("is_variant_included", paramsObj?.is_variant_included);

    return apiAuthorization.get(`/storefront/wishlists/${token}?${decodeURIComponent(params.toString())}`)
}
export const RetrieveTheDefaultWishlist = (
    paramsObj?: {
        include?: string,
        fields_wishlist?: string,
        is_variant_included?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_wishlist) params.append("fields[wishlist]", paramsObj?.fields_wishlist);
    if (paramsObj?.is_variant_included) params.append("is_variant_included", paramsObj?.is_variant_included);

    return apiAuthorization.get(`/storefront/wishlists/default?${decodeURIComponent(params.toString())}`)
}
export const UpdateAWishlist = (
    data: WishlistCreateUpdate,
    token: string,
    paramsObj?: {
        fields_wishlist?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.fields_wishlist) params.append("fields[wishlist]", paramsObj?.fields_wishlist);

    return apiAuthorization.patch(`/storefront/wishlists/${token}?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
