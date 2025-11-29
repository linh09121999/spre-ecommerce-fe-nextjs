import api from "../../api/apiOrderToken";

export const ListAllProductVariants = (
    product_slug: string,
    paramsObj?: {
        include?: string
    }) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/storefront/products/${product_slug}/variants?${decodeURIComponent(params.toString())}`)
}
