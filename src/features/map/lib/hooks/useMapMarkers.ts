"use client";

import { useCallback, useRef } from "react";
import type { StoreSearchResponse } from "@/entities/storeList/api";

export function useMapMarkers(onStoreSelect: (id: number) => void) {
  const markersRef = useRef<Map<number, naver.maps.Marker>>(new Map());
  const storesRef = useRef<Map<number, StoreSearchResponse>>(new Map());
  const prevSelectedIdRef = useRef<number | null>(null);

  const clearMarker = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();
    storesRef.current.clear();
  }, []);

  const createMarker = useCallback(
    (map: naver.maps.Map, store: StoreSearchResponse, iconHtml: string) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(store.coordinate.lat, store.coordinate.lon),
        map: map,
        icon: { content: iconHtml, anchor: new window.naver.maps.Point(30, 50) },
        zIndex: 50,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        onStoreSelect(store.id);
        map.panTo(marker.getPosition());
      });

      markersRef.current.set(store.id, marker);
      storesRef.current.set(store.id, store);
    },
    [onStoreSelect],
  );

  // 선택된 마커 업데이트
  const updateMarker = useCallback(
    (
      newSelectedId: number | null,
      renderIcon: (store: StoreSearchResponse, selected: boolean) => string,
    ) => {
      const prevSelectedId = prevSelectedIdRef.current;

      if (prevSelectedId !== null) {
        const prevMarker = markersRef.current.get(prevSelectedId);
        const prevStore = storesRef.current.get(prevSelectedId);
        if (prevMarker && prevStore) {
          prevMarker.setIcon({
            content: renderIcon(prevStore, false),
            anchor: new window.naver.maps.Point(30, 50),
          });
          prevMarker.setZIndex(50);
        }
      }

      if (newSelectedId !== null) {
        const newMarker = markersRef.current.get(newSelectedId);
        const newStore = storesRef.current.get(newSelectedId);
        if (newMarker && newStore) {
          newMarker.setIcon({
            content: renderIcon(newStore, true),
            anchor: new window.naver.maps.Point(30, 50),
          });
          newMarker.setZIndex(51);
        }
      }

      prevSelectedIdRef.current = newSelectedId;
    },
    [],
  );

  return { createMarker, updateMarker, clearMarker };
}
