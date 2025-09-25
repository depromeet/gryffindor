export interface ApiErrorResponse {
  code: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  response: T;
  errorResponse?: ApiErrorResponse;
}

export interface UserState {
  isLoggedIn: boolean;
  memberId?: number;
  displayName: string;
  honbabLevel: number;
  isLevelTestCompleted: boolean;
  canPostReview: boolean;
}
