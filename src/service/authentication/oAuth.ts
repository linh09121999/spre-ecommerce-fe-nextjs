import { AuthLogin } from "@/interface/interface";
import api from "../../api/apiToken";

export const GeneratingOAuthToken = (
    data: AuthLogin
) => {
    return api.post(`/spree_oauth/token`, data,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
    )
}

export const RefreshingOAuthToken = (
    data: {
        grant_type: 'refresh_token',
        refresh_token: string
    }
) => {
    return api.post(`/spree_oauth/token`, data,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
    )
}
