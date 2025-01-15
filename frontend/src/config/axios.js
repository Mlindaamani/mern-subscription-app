import axios from "axios";
import toast from "react-hot-toast";
import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  removeTokens,
} from "../utils/localStorage";

// Axios Instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor to attach the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log(config);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;

      try {
        const refreshToken = getRefreshToken();
        const { accessToken } = (
          await axiosInstance.post("/auth/refresh-token", {
            refreshToken,
          })
        ).data;

        originalRequest.headers["Authorization"] = `JWT ${accessToken}`;
        storeTokens(accessToken, getRefreshToken());
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token request failed:", refreshError);
        removeTokens();
        toast.error("Session expired. Please log in again.", {
          duration: 5000,
          position: "top-center",
        });
        window.location.href = import.meta.env.VITE_LOGIN_URL;
      }
    }
    return Promise.reject(error);
  }
);
