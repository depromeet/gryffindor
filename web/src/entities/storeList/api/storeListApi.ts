import { axiosInstance } from "@/shared/config";
import type { SimilerStoreRes, StoreListRequest, StoreListResponseReal } from "./types";

export const storeListApi = {
  getStoreByPost: async ({ requestBody }: StoreListRequest) =>
    await axiosInstance.post<StoreListResponseReal>(`/api/v1/stores`, {
      ...requestBody,
    }),
  getSimilarStores: async ({
    storeId,
    latitude,
    longitude,
  }: {
    storeId: number;
    latitude?: number;
    longitude?: number;
  }) => {
    const { response } = await axiosInstance.get<SimilerStoreRes[]>(
      `/api/v1/stores/${storeId}/similar`,
      {
        params: {
          storeId,
          latitude,
          longitude,
        },
      },
    );
    return response;
  },
};
