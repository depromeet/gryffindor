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

// Kakao 로그인은 웹뷰 내에서 Kakao JS SDK로 직접 처리되므로 브릿지 불필요
// export interface LoginKakaoResponse {
//   url: string;
//   success: boolean;
// }

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
  // loginKakao: 웹뷰 내에서 Kakao JS SDK로 직접 처리
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

/**
 * Represents all possible messages sent from the web to the native app.
 * It includes query-based requests and specific typed messages like opening an external link.
 */
export type WebToAppMessage =
  | BridgeRequest
  | { type: "open-external-link"; payload: { url: string } };
