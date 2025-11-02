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
