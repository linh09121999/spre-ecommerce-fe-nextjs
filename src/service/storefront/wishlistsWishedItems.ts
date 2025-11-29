import api from "../../api/apiAuthorization"
import { type AxiosResponse } from "axios";
import { type WishedItem, WishedItemUpdate, WishedItemDelete } from '../../interface/sendData/interfaceStorefront'

export const AddItemToWishlist = (data: WishedItem, token: string): Promise<AxiosResponse> => {
    return api.post(`/storefront/wishlists/${token}/add_item`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
} //1
export const AddItemsToWishlist = (data: WishedItem[], token: string): Promise<AxiosResponse> => {
    return api.post(`/storefront/wishlists/${token}/add_items`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
} //all
export const DeleteItemFromWishlist = (token: string, item_id: string): Promise<AxiosResponse> => {
    return api.delete(`/storefront/wishlists/${token}/remove_item/${item_id}`)
} //1
export const DeleteItemsFromWishlist = (
    data: WishedItemDelete,
    token: string
): Promise<AxiosResponse> => {
    return api.delete(`/storefront/wishlists/${token}/remove_items`, {
        headers: {
            "Content-Type": "application/vnd.api+json",
        },
        data, // body của request nằm trong config.data
    });
}; //all
export const SetWishedItemQuantity = (data: WishedItemUpdate, token: string, item_id: number): Promise<AxiosResponse> => {
    return api.patch(`/storefront/wishlists/${token}/set_item_quantity/${item_id}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
