import { AuthLogin } from "@/interface/interface";
import api from "../../api/apiToken";
import Cookies from 'js-cookie';

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

// Helper function để lưu refresh token vào cookie
export const saveRefreshTokenToCookie = (refreshToken: string) => {
    Cookies.set('refresh_token', refreshToken, {
        httpOnly: false, // js-cookie không hỗ trợ httpOnly trong browser
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 7 // 7 ngày
    });
}

// Helper function để lấy refresh token từ cookie
export const getRefreshTokenFromCookie = (): string | undefined => {
    return Cookies.get('refresh_token');
}

// Helper function để xóa refresh token từ cookie
export const removeRefreshTokenFromCookie = () => {
    Cookies.remove('refresh_token');
}