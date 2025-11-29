import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type User, UserUpdate } from '../../interface/sendData/interfaceStorefront'

export const CreateAnAccount = (data: { user: User }) => {
    return api.post(`/storefront/account`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
export const RetrieveAnAccount = (
    paramsObj?: {
        include?: string,
        fields_user?: string
    }
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (paramsObj?.include) params.append("include", paramsObj?.include);
    if (paramsObj?.fields_user) params.append("fields[user]", paramsObj?.fields_user);

    return api.get(`/storefront/account?${decodeURIComponent(params.toString())}`);
}
export const UpdateAnAccount = (data: { user: UserUpdate }): Promise<AxiosResponse> => {
    return api.patch(`/storefront/account`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
