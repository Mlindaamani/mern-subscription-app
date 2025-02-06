import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  removeTokens,
} from "../utils/localStorage";

const { VITE_BACKEND_URL } = import.meta.env;
const { VITE_LOGIN_URL } = import.meta.env;

// Create AxiosnInstance.
export const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
});

// Request interceptor:: Attach access token to authorization headers.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

// Response Interceptor:: Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    //Status code greater then 2xx will trigger these code
    const previousRequest = error.config;
    if (error.response.status === 401 && !previousRequest.sent) {
      previousRequest.sent = true;

      try {
        const refreshToken = getRefreshToken();
        const { accessToken } = (
          await axiosInstance.post("/auth/refresh-token", {
            refreshToken, 
          })
        ).data;
        storeTokens(accessToken, refreshToken);
        previousRequest.headers.Authorization = `JWT ${accessToken}`;
        // Retry previous request with new access token
        return axiosInstance(previousRequest);
      } catch (refreshError) {
        // Remove tokens
        removeTokens();
        // Redirect user to login page
        window.location.href = VITE_LOGIN_URL;
      }
    }
    return Promise.reject(error);
  }
);




