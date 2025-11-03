import type { BridgeQuery } from './types';

/**
 * Bridge Query Constants
 * Prevents typos and provides autocomplete
 */
export const BRIDGE_QUERIES = {
  DEVICE_SYSTEM_APP: 'fetchDeviceSystemForAppSet',
  DEVICE_SYSTEM_PLATFORM: 'fetchDeviceSystemForPlatformSet',
  DEVICE_LOCATION: 'fetchDeviceLocationForLatLngSet',
  LOGIN_APPLE: 'loginApple',
  LOGIN_KAKAO: 'loginKakao',
} as const satisfies Record<string, BridgeQuery>;

/**
 * Type-safe query name type
 */
export type BridgeQueryName = typeof BRIDGE_QUERIES[keyof typeof BRIDGE_QUERIES];
