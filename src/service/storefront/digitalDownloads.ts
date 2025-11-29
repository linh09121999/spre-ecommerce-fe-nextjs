import api from "../../api/apiOrderToken";

export const DownloadADigitalAsset = (token: string) => api.get(`/storefront/digitals/${token}`)
