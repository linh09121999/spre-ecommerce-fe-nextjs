import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Tạo instance axios với config mặc định
const api: AxiosInstance = axios.create({
    baseURL: "/api/token", // thay bằng domain của bạn
    timeout: 10000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

// Interceptor xử lý response
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;