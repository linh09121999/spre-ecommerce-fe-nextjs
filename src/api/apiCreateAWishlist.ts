import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Tạo instance axios với config mặc định
const api: AxiosInstance = axios.create({
    baseURL: "/api/createAWishlist", // thay bằng domain của bạn
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor xử lý request
api.interceptors.request.use(
    (config) => {
        const orderToken = localStorage.getItem("order_token");
        const userToken = localStorage.getItem("token");

        if (orderToken) config.headers["X-Spree-Order-Token"] = orderToken;
        if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
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