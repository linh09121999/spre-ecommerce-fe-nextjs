import api from "../../api/apiOrderToken";

export const ListAllProducts = (paramsObj?: {
    filter_ids?: string,
    filter_skus?: string,
    filter_price?: string,
    filter_taxons?: string,
    filter_vendor_ids?: string,
    filter_name?: string,
    filter_options_tshirt_color?: string,
    filter_properties_brand_name?: string,
    filter_show_deleted?: boolean,
    filter_show_discontinued?: boolean,
    filter_in_stock?: boolean,
    filter_backorderable?: boolean,
    filter_purchasable?: boolean,
    sort?: string,
    page?: number,
    per_page?: number,
    include?: string,
    fields_product?: string,
    image_transformation_size?: string,
    image_transformation_quality?: string,
}
) => {
    const params = new URLSearchParams();
    if (paramsObj?.filter_ids) params.append("filter[ids]", paramsObj?.filter_ids);
    if (paramsObj?.filter_skus) params.append("filter[skus]", paramsObj?.filter_skus);
    if (paramsObj?.filter_price) params.append("filter[price]", paramsObj?.filter_price);
    if (paramsObj?.filter_taxons) params.append("filter[taxons]", paramsObj?.filter_taxons);
    if (paramsObj?.filter_vendor_ids) params.append("filter[vendor_ids]", paramsObj?.filter_vendor_ids);
    if (paramsObj?.filter_name) params.append("filter[name]", paramsObj?.filter_name);
    if (paramsObj?.filter_options_tshirt_color) params.append("filter[options][tshirt-color]", paramsObj?.filter_options_tshirt_color);
    if (paramsObj?.filter_properties_brand_name) params.append("filter[properties][brand-name]", paramsObj?.filter_properties_brand_name);
    if (paramsObj?.filter_show_deleted) params.append("filter[show_deleted]", String(paramsObj?.filter_show_deleted));
    if (paramsObj?.filter_show_discontinued) params.append("filter[show_discontinued]", String(paramsObj?.filter_show_discontinued));
    if (paramsObj?.filter_in_stock) params.append("filter[in_stock]", String(paramsObj?.filter_in_stock));
    if (paramsObj?.filter_backorderable) params.append("filter[backorderable]", String(paramsObj?.filter_backorderable));
    if (paramsObj?.filter_purchasable) params.append("filter[purchasable]", String(paramsObj?.filter_purchasable));
    if (paramsObj?.sort) params.append("sort", paramsObj?.sort);
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_product) params.append("fields[product]", paramsObj?.fields_product);
    if (paramsObj?.image_transformation_size) params.append("image_transformation[size]", paramsObj?.image_transformation_size);
    if (paramsObj?.image_transformation_quality) params.append("image_transformation[quality]", paramsObj?.image_transformation_quality);

    return api.get(`/storefront/products?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAProduct = (
    product_slug: string,
    paramsObj?: {
        include?: string,
        fields_product?: string,
        image_transformation_size?: string,
        image_transformation_quality?: string,
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_product) params.append("fields[product]", paramsObj.fields_product);
    if (paramsObj?.image_transformation_size) params.append("image_transformation[size]", paramsObj?.image_transformation_size);
    if (paramsObj?.image_transformation_quality) params.append("image_transformation[quality]", paramsObj?.image_transformation_quality);

    return api.get(`/storefront/products/${product_slug}?${decodeURIComponent(params.toString())}`)
}