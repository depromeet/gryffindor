/**
 * Bridge Communication Type Definitions
 * Shared between React Native App and Next.js Web
 */

// ============================================
// Response Type Definitions
// ============================================

export interface DeviceSystemAppSetResponse {
  appVersion: string | number | undefined;
}

export interface DeviceSystemPlatformSetResponse {
  os: string;
  osVersion: string | null;
  modelName: string | null;
}

export interface DeviceLocationLatLngSetResponse {
  lat: number;
  lng: number;
}

export interface LoginAppleResponse {
  token: string;
  success: boolean;
}

export interface LoginKakaoResponse {
  url: string; // note: 카카오 로그인 URL (WebView에서 리다이렉트용, 앱으로 열었으면 빈 문자열)
  success: boolean;
}

export interface DeviceHapticFeedbackResponse {
  success: boolean;
}

// ============================================
// Bridge Schema
// ============================================

/**
 * Complete bridge communication schema
 * Key: Query name sent from Web
 * Value: Response type returned from App
 */
export interface BridgeSchema {
  fetchDeviceSystemForAppSet: DeviceSystemAppSetResponse;
  fetchDeviceSystemForPlatformSet: DeviceSystemPlatformSetResponse;
  fetchDeviceLocationForLatLngSet: DeviceLocationLatLngSetResponse;
  loginApple: LoginAppleResponse;
  loginKakao: LoginKakaoResponse;
  triggerHapticFeedback: DeviceHapticFeedbackResponse;
}

// ============================================
// Type Utilities
// ============================================

/**
 * All available query names
 */
export type BridgeQuery = keyof BridgeSchema;

/**
 * Extract response type for a specific query
 * @example BridgeResponse<'fetchDeviceSystemForAppSet'> -> DeviceSystemAppSetResponse
 */
export type BridgeResponse<T extends BridgeQuery> = BridgeSchema[T];

/**
 * Bridge message format from App to Web
 */
export type BridgeMessage<T extends BridgeQuery = BridgeQuery> = {
  [K in T]: BridgeSchema[K];
};

/**
 * Bridge request format from Web to App
 */
export interface BridgeRequest<T extends BridgeQuery = BridgeQuery> {
  query: T;
}
