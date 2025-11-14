export interface Reviewer {
  id: number;
  nickname: string;
  profileImageUrl: string;
  honbobLevel: number;
}

export interface Review {
  id: number;
  content: string;
  reviewer: Reviewer;
  storeId: number;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreReviewResponse {
  data: Review[];
  nextCursor: string;
  hasNext: boolean;
}

export interface CreateReviewRequest {
  storeId: number;
  content: string;
  keywords: string[];
}

export interface UpdateReviewRequest {
  content: string;
  keywords: string[];
}
