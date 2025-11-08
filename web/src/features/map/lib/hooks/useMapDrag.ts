"use client";

import { useEffect, useState } from "react";

export function useMapDrag(map: naver.maps.Map | null) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!map) return;

    const handleDragStart = () => {
      setIsDragging(true);
    };

    const listener = naver.maps.Event.addListener(map, "dragstart", handleDragStart);

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [map]);

  const resetDragging = () => setIsDragging(false);

  return { isDragging, resetDragging };
}
