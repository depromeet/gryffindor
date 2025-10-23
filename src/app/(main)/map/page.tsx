"use client";

import { useState } from "react";
import type { FilterData } from "@/features/filter/model/types";
import { useMapInitialize, useStoreListQuery } from "@/features/map/lib";
import {
  FetchStoreListButton,
  FilterBottomSheet,
  MapActionButton,
  MapMarkers,
  MapView,
  StoreBottomSheet,
} from "@/features/map/ui";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const { map, mapContainerRef, initializeMap } = useMapInitialize();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    price: { min: 0, max: 20000 },
    honbobLevel: 2,
    seatTypes: [],
    categories: [],
  });

  const { storeList, isFetching } = useStoreListQuery(filters);

  return (
    <TransitionLayout>
      <MapView mapRef={mapContainerRef} initializeMap={initializeMap} />
      <MapMarkers map={map} storeList={storeList} />
      <FetchStoreListButton onClick={() => {}} isFetching={isFetching} />
      <MapActionButton type="filter" onClick={() => setIsFilterOpen(true)} />
      <MapActionButton type="location" onClick={() => {}} />
      <StoreBottomSheet storeList={storeList} />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={filters}
        onApply={setFilters}
      />
    </TransitionLayout>
  );
}
