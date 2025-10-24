"use client";

import { useState } from "react";
import { getGeolocationErrorMessage } from "../utils/getGeolocationErrorMessage";

export function useGeolocation() {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
  };

  const handleSuccess = (position: GeolocationPosition) => {
    setCurrentLocation(position);
    setErrorMessage("");
  };

  const handleError = (error: GeolocationPositionError) => {
    setCurrentLocation(null);

    const errorMessage = getGeolocationErrorMessage(error);
    setErrorMessage(errorMessage);
    alert(errorMessage);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage("위치 서비스를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };

  return { currentLocation, errorMessage, requestLocation };
}
