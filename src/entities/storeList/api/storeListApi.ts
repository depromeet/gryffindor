import { axiosInstance } from "@/shared/config";
import type { StoreListRequest, StoreListResponseReal } from "./types";

export const storeListApi = {
  getStoreByPost: async ({ requestBody }: StoreListRequest) =>
    await axiosInstance.post<StoreListResponseReal>(`/api/v1/stores`, {
      ...requestBody,
    }),
};
