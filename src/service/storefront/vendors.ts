import api from "../../api/apiOrderToken";

export const ListAllVendors = (
    paramsObj?: {
        page?: number,
        per_page?: number,
        fields_vendor?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.page) params.append("page", String(paramsObj?.page));
    if (paramsObj?.per_page) params.append("per_page", String(paramsObj?.per_page));
    if (paramsObj?.fields_vendor) params.append("fields[vendor]", paramsObj?.fields_vendor);

    return api.get(`/storefront/vendors?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAVendor = (
    vendor_slug: string,
    paramsObj?: {
        fields_vendor?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.fields_vendor) params.append("fields[vendor]", paramsObj?.fields_vendor);

    api.get(`/storefront/vendors/${vendor_slug}?${decodeURIComponent(params.toString())}`)
}
