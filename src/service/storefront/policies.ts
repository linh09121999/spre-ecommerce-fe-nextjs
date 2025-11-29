import api from "../../api/apiOrderToken";

export const ListAllStorePolicies = () => api.get(`/storefront/policies`)
export const RetrieveAPolicy = (policy_slug: string) => api.get(`/storefront/policies/${policy_slug}`)
