"use client";

import { useEffect, useState } from "react";
import { getDefaultStationCenter } from "@/entities/storeList/lib";
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
import { useLocationStore } from "@/shared/store";
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

  const { selectedStation } = useLocationStore();
  const centerCoordinate = getDefaultStationCenter(selectedStation);

  const { storeList, isFetching } = useStoreListQuery(filters);

  useEffect(() => {
    if (!map) return;

    map.panTo(new window.naver.maps.LatLng(centerCoordinate.lat, centerCoordinate.lon));
  }, [map, centerCoordinate]);

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
