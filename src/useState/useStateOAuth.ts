import { create } from 'zustand'
import { ResOAuth } from '@/interface/responseData/interfaceOAuth'

import Cookies from 'js-cookie'
import { RefreshingOAuthToken } from '@/service/authentication/oAuth';

interface State_ResOAuth {
    resOAuth: ResOAuth | undefined;
    setResOAuth: (data: ResOAuth) => void;
    clearOAuth: () => void;
    refreshToken: () => Promise<void>;
}

export const useState_ResOAuth = create<State_ResOAuth>((set, get) => ({
    resOAuth: undefined,
    setResOAuth: (data) => set({ resOAuth: data }),
    clearOAuth: () => set({ resOAuth: undefined }),

    refreshToken: async () => {
        try {
            // Lấy refresh_token từ cookie httpOnly nếu có
            const refresh_token = Cookies.get('refresh_token')
            if (!refresh_token) throw new Error('No refresh_token available')

            const response = await RefreshingOAuthToken({ grant_type: 'refresh_token', refresh_token })
            const data: ResOAuth = response.data

            // Cập nhật zustand
            set({ resOAuth: data })

            // Cập nhật lại refresh_token vào cookie
            Cookies.set('refresh_token', data.refresh_token, { expires: data.expires_in / (60 * 60 * 24), secure: true, sameSite: 'Strict' })
        } catch (error) {
            console.error('Failed to refresh token', error)
            set({ resOAuth: undefined })
        }
    }
}))
