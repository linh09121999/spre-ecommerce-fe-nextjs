import { create } from 'zustand'
import { ResOAuth } from '@/interface/responseData/interfaceOAuth'
import { getRefreshTokenFromCookie, RefreshingOAuthToken, removeRefreshTokenFromCookie, saveRefreshTokenToCookie } from '@/service/authentication/oAuth';

interface State_ResOAuth {
    resOAuth: ResOAuth | undefined;
    setResOAuth: (data: ResOAuth) => void;
    clearOAuth: () => void;
    refreshAccessToken: () => Promise<string | null>;
    isRefreshing: boolean;
}

export const useState_ResOAuth = create<State_ResOAuth>((set, get) => ({
    resOAuth: undefined,
    isRefreshing: false,
    
    setResOAuth: (data) => {
        // Lưu refresh token vào cookie
        saveRefreshTokenToCookie(data.refresh_token);
        // Lưu vào state
        set({ resOAuth: data });
    },
    
    clearOAuth: () => {
        // Xóa khỏi cookie
        removeRefreshTokenFromCookie();
        // Xóa khỏi state
        set({ resOAuth: undefined });
    },
    
    refreshAccessToken: async () => {
        try {
            // Kiểm tra nếu đang refresh thì không gọi lại
            if (get().isRefreshing) {
                return null;
            }
            
            const refreshToken = getRefreshTokenFromCookie();
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            
            set({ isRefreshing: true });
            
            const response = await RefreshingOAuthToken({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            });
            
            const newTokenData: ResOAuth = response.data;
            
            // Lưu refresh token mới vào cookie
            saveRefreshTokenToCookie(newTokenData.refresh_token);
            
            // Cập nhật state
            set({ 
                resOAuth: newTokenData,
                isRefreshing: false 
            });
            
            return newTokenData.access_token;
            
        } catch (error) {
            console.error('Failed to refresh token:', error);
            set({ isRefreshing: false });
            
            // Nếu refresh thất bại, clear hết
            get().clearOAuth();
            return null;
        }
    }
}));