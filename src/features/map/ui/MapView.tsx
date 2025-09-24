"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { MapPin } from "@/entities/map/ui";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { useMapMarkers } from "../lib";

interface MapViewProps {
  storeList: StoreSearchResponse[];
  selectedStoreId: number | null;
  onStoreSelect: (storeId: number) => void;
}

export function MapView({ storeList, selectedStoreId, onStoreSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  const { createMarker, updateMarker, clearMarker } = useMapMarkers(onStoreSelect);

  const renderIcon = useCallback(
    (store: StoreSearchResponse, selected: boolean) =>
      renderToString(
        <MapPin selected={selected} name={store.name} honbobLevel={store.honbobLevel} />,
      ),
    [],
  );

  const initializeMap = () => {
    if (!window.naver || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
        // TODO: 초기 위치 강남역 설정, 추후 변경 필요
        center: new window.naver.maps.LatLng(37.499139, 127.028804),
        zoom: 16,
      });
    }

    const map = mapInstanceRef.current;
    clearMarker();

    storeList.forEach((store) => {
      createMarker(map, store, renderIcon(store, false));
    });
  };

  // 선택된 식당 변경 시 마커 업데이트
  useEffect(() => {
    updateMarker(selectedStoreId, renderIcon);
  }, [selectedStoreId, updateMarker, renderIcon]);

  useEffect(() => {
    return () => {
      clearMarker();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [clearMarker]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div ref={mapRef} className="fixed inset-0 h-screen w-screen" />
    </>
  );
}
