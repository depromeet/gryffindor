"use client";

import { useCallback, useState } from "react";

interface Bounds {
  nw: { lat: number; lon: number };
  se: { lat: number; lon: number };
}

interface Center {
  lat: number;
  lon: number;
}

export function useMapCoordinate() {
  // 초기 위치 강남역
  const [bounds, setBounds] = useState<Bounds>({
    nw: { lat: 37.5027403, lon: 127.0198043 },
    se: { lat: 37.4938538, lon: 127.037228 },
  });
  const [center, setCenter] = useState<Center>({ lat: 37.497175, lon: 127.027926 });

  const updateCoordinate = useCallback((map: naver.maps.Map | null) => {
    if (!map) return null;

    try {
      const bounds = map.getBounds();
      const center = map.getCenter();

      if (!(bounds instanceof naver.maps.LatLngBounds)) {
        console.warn("Invalid bounds type");
        return null;
      }

      if (!(center instanceof naver.maps.LatLng)) {
        console.warn("Invalid center type");
        return null;
      }

      const ne = bounds.getNE();
      const sw = bounds.getSW();

      setBounds({
        nw: { lat: ne.lat(), lon: sw.lng() },
        se: { lat: sw.lat(), lon: ne.lng() },
      });
      setCenter({ lat: center.lat(), lon: center.lng() });
    } catch (error) {
      console.error("Failed to update map coordinates:", error);
      return null;
    }
  }, []);

  return { bounds, center, updateCoordinate };
}
