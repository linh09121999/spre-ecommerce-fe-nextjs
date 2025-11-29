import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api/orderToken", // ✅ gọi qua route server Next.js
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const orderToken = localStorage.getItem("order_token");
    if (orderToken) {
      config.headers["X-Spree-Order-Token"] = orderToken;
    }

    if (config.method?.toLowerCase() === "post") {
      config.headers["Content-Type"] = "application/vnd.api+json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
