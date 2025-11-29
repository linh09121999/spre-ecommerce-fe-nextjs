import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const ApplyACouponCode = (
    data: { coupon_code: string },
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.patch(`/storefront/cart/apply_coupon_code?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
export const RemoveACoupon = (coupon_code: number): Promise<AxiosResponse> => {
    return api.delete(`/storefront/cart/remove_coupon_code/${coupon_code}`)
}
export const RemoveAllCoupon = (
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.delete(`/storefront/cart/remove_coupon_code?${decodeURIComponent(params.toString())}`)
}
