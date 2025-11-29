import api from "../../api/apiOrderToken";

export const ListAllPost = (
    paramsObj?: {
        filter_ids?: string,
        filter_title?: string,
        filter_post_category_id?: string,
        filter_post_category_slug?: string,
        page?: number,
        per_page?: number,
        sort?: string,
        include?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.filter_ids) params.append("filter[ids]", paramsObj?.filter_ids);
    if (paramsObj?.filter_title) params.append("filter[title]", paramsObj?.filter_title);
    if (paramsObj?.filter_post_category_id) params.append("filter[post_category_id]", paramsObj?.filter_post_category_id);
    if (paramsObj?.filter_post_category_slug) params.append("filter[post_category_slug]", paramsObj?.filter_post_category_slug);
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.sort) params.append("sort", paramsObj?.sort);
    if (paramsObj?.include) params.append("include", paramsObj?.include);

    return api.get(`/storefront/posts?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAPost = (
    id: string,
    paramsObj?: {
        include?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);

    return api.get(`/storefront/posts/${id}?${decodeURIComponent(params.toString())}`)
}
