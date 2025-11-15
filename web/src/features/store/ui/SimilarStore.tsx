"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { type SimilarStoreRes, storeListApi } from "@/entities/storeList/api";
import { SimilarStoreCard } from "@/entities/storeList/ui/SimilarStoreCard";
import { useGeolocation } from "@/features/map/lib/hooks/useGeolocation";
import { queryKeys } from "@/shared/api/queryKeys";

export function SimilarStore({ storeId }: { storeId: number }) {
  const { currentLocation, requestLocation } = useGeolocation();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!hasRequested.current) {
      requestLocation();
      hasRequested.current = true;
    }
  }, [requestLocation]);

  const { data: similarStores, isLoading } = useQuery<SimilarStoreRes[]>({
    queryKey: [queryKeys.SIMILAR_STORES(storeId)],
    enabled: !!currentLocation,
    queryFn: () => {
      if (!currentLocation) {
        throw new Error("currentLocation is required");
      }
      return storeListApi.getSimilarStores({
        storeId,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    },
  });

  if (isLoading) {
    return (
      <section className="flex justify-center items-center py-10">
        <span className="text-body2 text-gray500">추천 식당을 불러오는 중...</span>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 py-5">
      <div className="flex w-full items-center px-5">
        <span className="whitespace-pre-line text-subtitle1 text-gray900">{`추천하는\n근처 혼밥 식당이에요`}</span>
      </div>
      <div className="flex gap-3 overflow-x-auto px-5 scrollbar-hide">
        {similarStores?.map((store: SimilarStoreRes) => (
          <SimilarStoreCard key={store.id} {...store} />
        ))}
      </div>
    </section>
  );
}
