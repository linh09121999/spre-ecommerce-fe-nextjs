import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type LineItem, LineItemUpdate } from '../../interface/sendData/interfaceStorefront'

export const AddAnItemToCart = (
    data: LineItem,
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.post(`/storefront/cart/add_item?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        })
}
export const RemoveAnItemToCart = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/storefront/cart/remove_line_item/${id}`)
}
export const SetLineItemQuantity = (
    data: LineItemUpdate,
    paramsObj?: {
        include?: string,
        fields_cart?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_cart) params.append("fields[cart]", paramsObj?.fields_cart);
    return api.patch(`/storefront/cart/set_quantity?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
