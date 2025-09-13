import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import type { ApiResponse } from "@/shared/model";

// Token refresh를 위한 상태 관리
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000 * 60 * 5,
});

// Request 인터셉터: 토큰을 헤더에 자동으로 추가
instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.oAuthAccessToken) {
      config.headers.Authorization = `Bearer ${session.oAuthAccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response 인터셉터: 401 에러 시 토큰 갱신 시도
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !(originalRequest as { _retry?: boolean })._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중인 경우 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      (originalRequest as { _retry?: boolean })._retry = true;
      isRefreshing = true;

      try {
        // NextAuth 세션 갱신을 통해 토큰 재발급
        const session = await getSession();

        if (session?.oAuthAccessToken && !session.error) {
          processQueue(null, session.oAuthAccessToken);

          // 원래 요청에 새로운 토큰 적용
          originalRequest.headers.Authorization = `Bearer ${session.oAuthAccessToken}`;

          return instance(originalRequest);
        } else {
          // 토큰 갱신 실패 시 로그아웃 처리
          processQueue(new Error("Token refresh failed"), null);

          // 로그인 페이지로 리다이렉트
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const axiosInstance = {
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await instance.get(url, config);
    return response.data;
  },

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await instance.post(url, data, config);
    return response.data;
  },

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await instance.put(url, data, config);
    return response.data;
  },

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await instance.patch(url, data, config);
    return response.data;
  },

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await instance.delete(url, config);
    return response.data;
  },
};
