import Script from "next/script";
import { memo } from "react";

interface MapViewProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  initializeMap: () => void;
}

function MapViewComponent({ mapRef, initializeMap }: MapViewProps) {
  return (
    <>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div ref={mapRef} className="fixed inset-0 h-screen w-screen" />
    </>
  );
}

export const MapView = memo(MapViewComponent);
