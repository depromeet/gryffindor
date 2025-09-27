"use client";

import { useState } from "react";
import type { FilterData } from "@/features/filter/model/types";
import { useStoreListQuery } from "@/features/map/lib";
import {
  FetchStoreListButton,
  FilterBottomSheet,
  MapActionButton,
  MapView,
  StoreBottomSheet,
} from "@/features/map/ui";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    price: { min: 0, max: 20000 },
    honbobLevel: 1,
    seatTypes: [],
    categories: [],
  });

  const { storeList, refetch, isFetching } = useStoreListQuery(filters);

  return (
    <TransitionLayout>
      <MapView storeList={storeList} />
      <FetchStoreListButton onClick={refetch} isFetching={isFetching} />
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
