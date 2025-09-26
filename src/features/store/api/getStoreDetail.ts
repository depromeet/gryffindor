import type { StoreResponse } from "@/entities/store/model";
import { axiosInstance } from "@/shared/config";

export const getStoreDetail = async (storeId: string) => {
  const response = await axiosInstance.get<StoreResponse>(`/api/v1/stores/${storeId}`);
  return response.response;
};
