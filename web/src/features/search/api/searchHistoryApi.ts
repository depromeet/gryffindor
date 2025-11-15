import type { StoreListResponseReal } from "@/entities/storeList/api/types";
import { axiosInstance } from "@/shared/config";

export interface SearchHistoryResponse {
  id: number;
  query: string;
  updateAt: string;
}

export interface SearchStoreRequest {
  query: string;
  paging: {
    limit: number;
    lastKnown?: string;
  };
  lat: number;
  lon: number;
}

export const searchHistoryApi = {
  searchStore: async (request: SearchStoreRequest) => {
    const { response } = await axiosInstance.post<StoreListResponseReal>("/api/v1/search", request);
    return response.data;
  },
  getHistory: async ({ limit, lastKnown }: { limit: number; lastKnown?: string }) => {
    const { response } = await axiosInstance.get<SearchHistoryResponse[]>(
      "/api/v1/search/history",
      {
        params: {
          limit,
          lastKnown,
        },
      },
    );

    return response;
  },
  deleteHistory: async (id: number) => {
    const { response } = await axiosInstance.delete(`/api/v1/search/history/${id}`);
    return response;
  },
  deleteAllHistory: async () => {
    const { response } = await axiosInstance.delete("/api/v1/search/history");
    return response;
  },
};
