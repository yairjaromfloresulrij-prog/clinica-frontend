import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
});

// Interceptor de request: agrega el token de Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response: si recibe 401, cierra la sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
