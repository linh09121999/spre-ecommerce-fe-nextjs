import api from "../../api/apiOrderToken";

export const GetDefaultCountry = (
    paramsObj?: {
        include?: string,
        fields_country?: string
    }
) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_country) params.append("fields[country]", paramsObj?.fields_country);

    return api.get(`/storefront/countries/default?${decodeURIComponent(params.toString())}`)
}
export const ListAllCountries = (paramsObj?: { include?: string }) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/storefront/countries?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAContry = (iso: string, paramsObj?: { include?: string }) => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    return api.get(`/storefront/countries/${iso}?${decodeURIComponent(params.toString())}`)
}
