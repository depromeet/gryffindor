"use client";

import { useCallback, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { MapPin } from "@/entities/map/ui";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { useMapMarkers } from "../lib/hooks/useMapMarkers";
import { useMapStore } from "../model";

interface MapMarkersProps {
  map: naver.maps.Map | null;
  storeList: StoreListResponseData[];
}

export function MapMarkers({ map, storeList }: MapMarkersProps) {
  const prevSelectedStoreIdRef = useRef<number | null>(null);
  const { createMarker, updateMarker, clearMarker, getStore } = useMapMarkers(map);
  const { selectedStoreId } = useMapStore();

  const getMarkerHtml = useCallback((store: StoreListResponseData, selected: boolean) => {
    return renderToString(
      <MapPin selected={selected} name={store.name} honbobLevel={store.honbobLevel} />,
    );
  }, []);

  useEffect(() => {
    clearMarker();

    storeList.forEach((store) => {
      createMarker(store, getMarkerHtml(store, false));
    });
  }, [storeList, createMarker, clearMarker, getMarkerHtml]);

  useEffect(() => {
    const prevSelectedId = prevSelectedStoreIdRef.current;

    // 이전 선택된 마커 비활성화
    if (prevSelectedId !== null && prevSelectedId !== selectedStoreId) {
      const prevStore = getStore(prevSelectedId);
      if (prevStore) updateMarker(prevSelectedId, getMarkerHtml(prevStore, false), false);
    }

    // 새로 선택된 마커 활성화
    if (selectedStoreId !== null && selectedStoreId !== prevSelectedId) {
      const currentStore = getStore(selectedStoreId);
      if (currentStore) updateMarker(selectedStoreId, getMarkerHtml(currentStore, true), true);
    }

    prevSelectedStoreIdRef.current = selectedStoreId;
  }, [selectedStoreId, updateMarker, getMarkerHtml, getStore]);

  return null;
}
