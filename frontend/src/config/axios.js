import axios from "axios";
import toast from "react-hot-toast";
import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  removeTokens,
} from "../utils/localStorage";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor to attach the access token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `JWT ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and avoid infinite loop by checking _retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = getRefreshToken();
        const { accessToken } = await axios.post("/auth/refresh-token", {
          token,
        });
        storeTokens(accessToken, getRefreshToken());
        axiosInstance.defaults.headers["Authorization"] = `JWT ${accessToken}`;
        originalRequest.headers["Authorization"] = `JWT ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        removeTokens();
        toast.error("Session expired. Please log in again.", {
          duration: 2000,
          position: "top-center",
        });

        window.location.href = import.meta.env.VITE_LOGIN_URL;
      }
    }
    return Promise.reject(error);
  }
);
