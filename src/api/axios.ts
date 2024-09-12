import { API_HOST } from "@/const/env";
import { JWT_KEY } from "@/const/jwt";
import { sessionService } from "@/services/session";
import axios from "axios";

const STORAGE_KEY = JWT_KEY;

const api = axios.create({
  baseURL: API_HOST,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  try {
    const token = sessionService.get(STORAGE_KEY);
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (e) {
    console.log("interceptor", e);
  }
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    // sessionService.remove(STORAGE_KEY);
    throw error;
  }
);

export { api };
