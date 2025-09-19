"use client";

import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getSession, signOut } from "next-auth/react";
import type { ApiResponse } from "@/shared/model";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 1000 * 60 * 5,
});

// Request 인터셉터: 토큰을 헤더에 자동으로 추가
instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    console.log("session", session);

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response 인터셉터: 토큰 갱신 및 에러 처리
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401 && originalRequest) {
      // 토큰 갱신을 위해 세션 갱신 시도
      const session = await getSession();

      if (session?.error) {
        // 세션에 에러가 있으면 로그아웃
        console.error("Session error detected:", session.error);
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(error);
      }

      if (
        session?.accessToken &&
        session.accessToken !==
          (originalRequest.headers?.Authorization as string)?.replace("Bearer ", "")
      ) {
        // 새로운 토큰으로 재시도
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
        return instance(originalRequest);
      }

      // 토큰 갱신도 실패했으면 로그아웃
      console.error("Token refresh failed - redirecting to login");
      await signOut({ callbackUrl: "/login" });
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
