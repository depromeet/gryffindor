import type {
  CreateReviewRequest,
  Review,
  StoreReviewResponse,
  UpdateReviewRequest,
} from "@/entities/review/model";
import { axiosInstance } from "@/shared/config";

interface GetStoreReviewsRequest {
  storeId: number;
  limit?: number;
  lastKnown?: string;
}

export const getStoreReviews = async ({
  storeId,
  limit = 10,
  lastKnown,
}: GetStoreReviewsRequest) => {
  const { response } = await axiosInstance.get<StoreReviewResponse>(
    `/api/v1/reviews/stores/${storeId}`,
    {
      params: {
        limit,
        lastKnown,
      },
    },
  );
  return response;
};

export const createReview = async (review: CreateReviewRequest) => {
  const { response } = await axiosInstance.post<Review>("/api/v1/reviews", review);
  return response;
};

export const deleteReview = async (reviewId: number) => {
  const { response } = await axiosInstance.delete(`/api/v1/reviews/${reviewId}`);
  return response;
};

export const updateReview = async ({
  reviewId,
  review,
}: {
  reviewId: number;
  review: UpdateReviewRequest;
}) => {
  const { response } = await axiosInstance.put<Review>(`/api/v1/reviews/${reviewId}`, review);
  return response;
};

interface GetMyReviewsRequest {
  memberId: number;
  limit?: number;
  lastKnown?: string;
}

export const getMyReviews = async ({ memberId, limit = 20, lastKnown }: GetMyReviewsRequest) => {
  const { response } = await axiosInstance.get<StoreReviewResponse>(`/api/v1/reviews/my`, {
    params: {
      memberId,
      limit,
      lastKnown,
    },
  });
  return response;
};
