import axios, { AxiosError } from "axios";
import { apiBaseUrl } from "./serviceConsts";
import { getTokenFromLocalStorage } from "../utils/getTokenFromLocalStorage";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error", error);
    if (
      error.response?.status === 401 &&
      error.response.data?.error === "TokenExpired"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
