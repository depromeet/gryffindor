"use client";

import { useMemo } from "react";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { FloatingStoreCard, StoreList } from "@/entities/storeList/ui";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
} from "@/shared/ui";

interface StoreListBottomSheetProps {
  storeList: StoreSearchResponse[];
  selectedStoreId: number | null;
}

export function StoreListBottomSheet({ storeList, selectedStoreId }: StoreListBottomSheetProps) {
  const selectedStoreInfo = useMemo(
    () => storeList.find((store) => store.id === selectedStoreId),
    [storeList, selectedStoreId],
  );

  if (selectedStoreInfo) return <FloatingStoreCard {...selectedStoreInfo} />;

  return (
    <BottomSheet isFixed={false} isOpen={true} initialHeight={226} expandedOffset={88}>
      <BottomSheetHeader>
        <BottomSheetHandler />
      </BottomSheetHeader>
      <BottomSheetContent className="px-5 pb-9">
        <StoreList storeList={storeList} />
      </BottomSheetContent>
    </BottomSheet>
  );
}
