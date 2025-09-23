export interface Reviewer {
  id: number;
  nickname: string;
  profileImageUrl: string;
  level: number;
}

export interface Review {
  id: number;
  content: string;
  reviewer: Reviewer;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  data: Review[];
  nextCursor: string | null;
  hasNext: boolean;
  metadata: Record<string, unknown>;
}
