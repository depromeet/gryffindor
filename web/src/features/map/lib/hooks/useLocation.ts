import { useCallback, useEffect } from "react";
import { getDefaultStationCenter } from "@/entities/storeList/lib";
import { useLocationStore } from "@/shared/store";
import { useGeolocation } from "./useGeolocation";
import { useLocationMarker } from "./useLocationMarker";

export const useLocation = (map: naver.maps.Map | null) => {
  const { selectedStation } = useLocationStore();
  const { currentLocation, errorMessage, requestLocation } = useGeolocation();
  const { marker, createMarker, updatePosition } = useLocationMarker();

  const getCurrentPosition = useCallback(() => {
    if (!currentLocation) return null;

    const { latitude, longitude } = currentLocation.coords;
    return new window.naver.maps.LatLng(latitude, longitude);
  }, [currentLocation]);

  // 현재 위치로 지도 이동
  useEffect(() => {
    if (!map || !currentLocation) return;

    const position = getCurrentPosition();
    if (position) map.panTo(position);
  }, [map, currentLocation, getCurrentPosition]);

  // 마커 표시
  useEffect(() => {
    if (!map || !currentLocation) return;

    const position = getCurrentPosition();
    if (!position) return;

    if (!marker) createMarker(map, position);
    else updatePosition(position);
  }, [map, currentLocation, marker, createMarker, updatePosition, getCurrentPosition]);

  // 선택한 역으로 지도 이동
  useEffect(() => {
    if (!map) return;

    const { lat, lon } = getDefaultStationCenter(selectedStation);
    map.panTo(new window.naver.maps.LatLng(lat, lon));
  }, [map, selectedStation]);

  return {
    errorMessage,
    requestLocation,
  };
};
