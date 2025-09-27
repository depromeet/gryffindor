"use client";

import { useCallback, useRef } from "react";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { useMapStore } from "../../model";

export function useMapMarkers(map: naver.maps.Map | null) {
  const markersRef = useRef<Map<number, naver.maps.Marker>>(new Map());
  const storesRef = useRef<Map<number, StoreListResponseData>>(new Map());

  const { selectStore } = useMapStore();

  const clearMarker = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();
    storesRef.current.clear();
  }, []);

  // 마커 생성
  const createMarker = useCallback(
    (store: StoreListResponseData, iconHtml: string) => {
      if (!map) return;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(store.coordinate.lat, store.coordinate.lon),
        map: map,
        icon: { content: iconHtml, anchor: new window.naver.maps.Point(30, 50) },
        zIndex: 50,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        selectStore(store.id);
        map.panTo(marker.getPosition());
      });

      markersRef.current.set(store.id, marker);
      storesRef.current.set(store.id, store);
    },
    [selectStore, map],
  );

  // 마커 업데이트
  const updateMarker = useCallback((storeId: number, iconHtml: string, selected: boolean) => {
    const marker = markersRef.current.get(storeId);
    if (marker) {
      marker.setIcon({
        content: iconHtml,
        anchor: new window.naver.maps.Point(30, 50),
      });
      marker.setZIndex(selected ? 51 : 50);
    }
  }, []);

  const getStore = (storeId: number) => {
    return storesRef.current.get(storeId);
  };

  return { createMarker, updateMarker, clearMarker, getStore };
}
