import api from "../../api/apiOrderToken";

export const ListAllTaxons = (
    paramsObj?: {
        filter_ids?: string,
        filter_name?: string,
        filter_parent_id?: string,
        filter_parent_permalink?: string,
        filter_taxonomy_id?: string,
        filter_roots?: boolean,
        filter_vendor_id?: string,
        page?: number,
        per_page?: number,
        include?: string,
        fields_taxon?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.filter_ids) params.append("filter[ids]", paramsObj?.filter_ids);
    if (paramsObj?.filter_name) params.append("filter[name]", paramsObj?.filter_name);
    if (paramsObj?.filter_parent_id) params.append("filter[parent_id]", paramsObj?.filter_parent_id);
    if (paramsObj?.filter_parent_permalink) params.append("filter[parent_permalink]", paramsObj?.filter_parent_permalink);
    if (paramsObj?.filter_taxonomy_id) params.append("filter[taxonomy_id]", paramsObj?.filter_taxonomy_id);
    if (paramsObj?.filter_roots) params.append("filter[roots]", String(paramsObj?.filter_roots));
    if (paramsObj?.filter_vendor_id) params.append("filter[vendor_id]", paramsObj?.filter_vendor_id);
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_taxon) params.append("fields[taxon]", paramsObj?.fields_taxon);

    return api.get(`/storefront/taxons?${decodeURIComponent(params.toString())}`)
}
export const RetrieveATaxon = (
    taxon_permalink: string,
    paramsObj?: {
        include?: string,
        fields_taxon?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_taxon) params.append("fields[taxon]", paramsObj?.fields_taxon);

    return api.get(`/storefront/taxons/${taxon_permalink}?${decodeURIComponent(params.toString())}`)
}
