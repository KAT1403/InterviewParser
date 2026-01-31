import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import { refreshAccessToken } from "../lib/refreshToken";
import { getTokens } from "../lib/tokens/getTokens";

export function createAppApiService(
  config?: CreateAxiosDefaults,
): AxiosInstance {
  const basicApiServiceInstance = axios.create({
    baseURL: "https://ib.mrbelka12000.com",
    timeout: 30000,
    ...config,
  });

  basicApiServiceInstance.interceptors.request.use(
    async (config) => {
      const tokens = getTokens();
      if (tokens.access_token) {
        config.headers.Authorization = tokens.access_token;
      }
      return config;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
      }
      return Promise.reject(error);
    },
  );

  basicApiServiceInstance.interceptors.response.use(
    (config) => config,
    async (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          try {
            const newToken = await refreshAccessToken();
            if (error.config) {
              error.config.headers.Authorization = newToken;
              return basicApiServiceInstance.request(error.config);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            window.location.href = "/login";
          }
        }
        console.error(error.message);
      }
      return Promise.reject(error);
    },
  );

  return basicApiServiceInstance;
}
