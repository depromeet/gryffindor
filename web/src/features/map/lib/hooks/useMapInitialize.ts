"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useMapInitialize() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || map) return;

    const mapInstance = new window.naver.maps.Map(mapContainerRef.current, {
      // 초기 위치 강남역
      center: new window.naver.maps.LatLng(37.497175, 127.027926),
      zoom: 16,
    });

    setMap(mapInstance);
  }, [map]);

  useEffect(() => {
    return () => map?.destroy();
  }, [map]);

  return { mapContainerRef, map, initializeMap };
}
