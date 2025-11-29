import api from "../../api/apiOrderToken";

export const ListAllPostCategories = (
    paramsObj?: {
        filter_ids?: string,
        filter_title?: string,
        page?: number,
        per_page?: number,
        sort?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.filter_ids) params.append("filter[ids]", paramsObj?.filter_ids);
    if (paramsObj?.filter_title) params.append("filter[title]", paramsObj?.filter_title);
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.sort) params.append("sort", paramsObj?.sort);

    return api.get(`/storefront/post_categories?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAPostCategory = (id: number, paramsObj?: {include?: string}) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);

    return api.get(`/storefront/post_categories/${id}?${decodeURIComponent(params.toString())}`)
}
