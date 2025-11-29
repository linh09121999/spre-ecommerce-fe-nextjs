import api from "../../api/apiOrderToken";

export const ReturnTheCurrentStore = (
    include?: string,
    fields_store?: string
) => {
    return api.get("/storefront/store", {
        params: {
            ...(include && { include }),
            ...(fields_store && { "fields[store]": fields_store }),
        },
    });
}
