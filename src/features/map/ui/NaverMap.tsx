"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import type { StoreInfoProps } from "@/app/(main)/map/page";
import { MapPin } from "@/entities/map/ui";

interface NaverMapProps {
  storeList: StoreInfoProps[];
  selectedStoreId: number | null;
  onStoreSelect: (storeId: number) => void;
}

export function NaverMap({ storeList, selectedStoreId, onStoreSelect }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<Map<number, naver.maps.Marker>>(new Map());
  const storeMapRef = useRef<Map<number, StoreInfoProps>>(new Map());
  const prevSelectedIdRef = useRef<number | null>(null);

  const initializeMap = () => {
    if (!window.naver || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      const mapOptions = {
        // TODO: 초기 위치 강남역 설정, 추후 변경 필요
        center: new window.naver.maps.LatLng(37.499139, 127.028804),
        zoom: 16,
      };
      mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);
    }
    createMarkers(storeList);
  };

  const createMarkers = useCallback(
    (stores: StoreInfoProps[]) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      // 기존 마커 제거
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current.clear();
      storeMapRef.current.clear();

      // 식당 데이터 저장
      stores.forEach((store) => {
        storeMapRef.current.set(store.id, store);
      });

      // 마커 생성
      stores.forEach((store) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(store.coordinate.lat, store.coordinate.lon),
          map: map,
          icon: {
            content: renderToString(
              <MapPin selected={false} name={store.name} honbobLevel={store.honbobLevel} />,
            ),
            anchor: new window.naver.maps.Point(30, 50),
          },
          zIndex: 50,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          onStoreSelect(store.id);
          map.panTo(marker.getPosition()); // 클릭한 마커로 지도 이동
        });

        markersRef.current.set(store.id, marker);
      });

      console.log(`🗺️ 새로운 검색: ${storeList.length}개 매장 마커 생성`);
    },
    [storeList, onStoreSelect],
  );

  const updateSelectedMarker = useCallback(
    (newSelectedId: number | null, prevSelectedId: number | null) => {
      // 이전 선택된 마커 비활성화
      if (prevSelectedId !== null) {
        const prevMarker = markersRef.current.get(prevSelectedId);
        const prevStore = storeMapRef.current.get(prevSelectedId);

        if (prevMarker && prevStore) {
          prevMarker.setIcon({
            content: renderToString(
              <MapPin selected={false} name={prevStore.name} honbobLevel={prevStore.honbobLevel} />,
            ),
            anchor: new window.naver.maps.Point(30, 50),
          });
          prevMarker.setZIndex(50);
        }
      }

      // 새 선택된 마커 활성화
      if (newSelectedId !== null) {
        const newMarker = markersRef.current.get(newSelectedId);
        const newStore = storeMapRef.current.get(newSelectedId);

        if (newMarker && newStore) {
          newMarker.setIcon({
            content: renderToString(
              <MapPin selected={true} name={newStore.name} honbobLevel={newStore.honbobLevel} />,
            ),
            anchor: new window.naver.maps.Point(30, 50),
          });
          newMarker.setZIndex(51);
        }
      }
      console.log(`📍 핀 선택 변경: ${prevSelectedId} → ${newSelectedId}`);

      prevSelectedIdRef.current = newSelectedId;
    },
    [],
  );

  // 선택된 식당 변경 시 마커 업데이트
  useEffect(() => {
    if (markersRef.current.size > 0) {
      updateSelectedMarker(selectedStoreId, prevSelectedIdRef.current);
    }
  }, [selectedStoreId, updateSelectedMarker]);

  // 컴포넌트 언마운트 시 지도/마커 정리
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current.clear();
      storeMapRef.current.clear();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onLoad={initializeMap}
      />
      <div ref={mapRef} className="fixed inset-0 h-screen w-screen" />
    </>
  );
}
