"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { MapMarkers } from "./MapMarkers";

export function MapView({ storeList }: { storeList: StoreListResponseData[] }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const initializeMap = () => {
    if (!mapContainerRef.current || map) return;

    const mapInstance = new window.naver.maps.Map(mapContainerRef.current, {
      // TODO: 임시로 강남역 좌표 설정, 추후 변경 필요
      center: new window.naver.maps.LatLng(37.499139, 127.028804),
      zoom: 16,
    });
    setMap(mapInstance);
  };

  useEffect(() => {
    return () => map?.destroy();
  }, [map]);

  return (
    <section>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div ref={mapContainerRef} className="fixed inset-0 h-screen w-screen" />
      {map && <MapMarkers map={map} storeList={storeList} />}
    </section>
  );
}
