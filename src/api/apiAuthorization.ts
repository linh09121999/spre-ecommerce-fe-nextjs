import { useState_ResOAuth } from '@/useState/useStateOAuth';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Tạo instance axios với config mặc định
const api: AxiosInstance = axios.create({
    baseURL: "/api/authorization", // thay bằng domain của bạn
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Hàm lấy token từ zustand store
const getTokenFromStore = (): string | null => {
    const state = useState_ResOAuth.getState();
    return state.resOAuth?.access_token || null;
};
// Interceptor xử lý request
api.interceptors.request.use(
    (config) => {
        // Ví dụ: thêm token vào header nếu có
        const token = getTokenFromStore();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor xử lý response
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;