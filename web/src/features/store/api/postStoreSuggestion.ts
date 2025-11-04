import { axiosInstance } from "@/shared/config";

interface PostStoreSuggestionRequest {
  storeId: string;
  content: string;
}

export const postStoreSuggestion = async ({ storeId, content }: PostStoreSuggestionRequest) => {
  const response = await axiosInstance.post(`/api/v1/stores/${storeId}/proposals`, { content });
  return response.response;
};
