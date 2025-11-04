import type { BridgeMessage, BridgeQuery } from "@bridge";
import * as Location from "expo-location";

export const useDeviceLocation = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void,
) => {
  const fetchDeviceLocationForLatLngSet = () => {
    const requestPermission = async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      if (result.status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        onResponse({
          fetchDeviceLocationForLatLngSet: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        });
      } else {
        onResponse({
          fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 },
        });
      }
    };
    requestPermission();
  };

  return {
    fetchDeviceLocationForLatLngSet,
  };
};
