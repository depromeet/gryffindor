export interface ApiErrorResponse {
  code: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  response: T;
  errorResponse?: ApiErrorResponse;
}
