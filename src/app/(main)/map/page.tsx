"use client";

import { useState } from "react";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { STORE_LIST_MOCK_DATA } from "@/entities/storeList/model";
import type { FilterData } from "@/features/filter/model/types";
import {
  FetchStoreListButton,
  MapActionButton,
  MapView,
  StoreListBottomSheet,
} from "@/features/map/ui";
import { FilterBottomSheet } from "@/features/map/ui/FilterBottomSheet";
import { TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  // TODO: API 연동 후, 목 데이터 제거
  const [storeList] = useState<StoreSearchResponse[]>(STORE_LIST_MOCK_DATA);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterData>({
    price: { min: 0, max: 20000 },
    level: null,
    seatTypes: [],
    categories: [],
  });

  return (
    <TransitionLayout>
      <MapView
        storeList={storeList}
        selectedStoreId={selectedStoreId}
        onStoreSelect={(id) => setSelectedStoreId(id)}
      />
      <FetchStoreListButton onClick={() => {}} />
      <MapActionButton type="filter" onClick={() => setIsFilterOpen(true)} />
      <MapActionButton type="target" onClick={() => {}} />
      <StoreListBottomSheet storeList={storeList} selectedStoreId={selectedStoreId} />
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={filters}
        onApply={setFilters}
      />
    </TransitionLayout>
  );
}
