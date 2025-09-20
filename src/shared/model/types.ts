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
  displayName: string;
  honbabLevel: number;
  isLevelTestCompleted: boolean;
  canPostReview: boolean;
}
