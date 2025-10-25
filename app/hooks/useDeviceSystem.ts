import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
import type { BridgeMessage, BridgeQuery } from "@bridge";

export const useDeviceSystem = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void
) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const fetchDeviceSystemForAppSet = () => {
    const appVersion = isAndroid
      ? Constants.expoConfig?.android?.versionCode
      : isIos
      ? Constants.expoConfig?.ios?.buildNumber
      : undefined;

    onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion,
      },
    });
  };

  const fetchDeviceSystemForPlatformSet = () => {
    onResponse({
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion,
        modelName: Device.modelName,
      },
    });
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDeviceSystemForPlatformSet,
  };
};
