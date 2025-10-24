"use client";

import { useCallback, useRef } from "react";
import { renderToString } from "react-dom/server";
import { MapLocation } from "@/entities/map/ui";

export function useLocationMarker() {
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const createMarker = useCallback((map: naver.maps.Map, position: naver.maps.LatLng) => {
    markerRef.current = new window.naver.maps.Marker({
      position: position,
      map: map,
      icon: {
        content: renderToString(<MapLocation />),
        anchor: new window.naver.maps.Point(30, 50),
      },
      zIndex: 50,
    });
  }, []);

  const updatePosition = useCallback((position: naver.maps.LatLng) => {
    markerRef.current?.setPosition(position);
  }, []);

  return {
    marker: markerRef.current,
    createMarker,
    updatePosition,
  };
}
