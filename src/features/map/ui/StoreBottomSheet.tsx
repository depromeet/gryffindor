"use client";

import Link from "next/link";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { SelectedStoreCard, StoreCard } from "@/entities/storeList/ui";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
} from "@/shared/ui";
import { useMapStore } from "../model";

export function StoreBottomSheet({ storeList }: { storeList: StoreSearchResponse[] }) {
  const { selectedStoreId } = useMapStore();

  if (selectedStoreId) {
    const selectedStoreInfo = storeList.find((store) => store.id === selectedStoreId);
    if (selectedStoreInfo) return <SelectedStoreCard {...selectedStoreInfo} />;
  }

  return (
    <BottomSheet isFixed={false} isOpen={true} initialHeight={226} expandedOffset={88}>
      <BottomSheetHeader>
        <BottomSheetHandler />
      </BottomSheetHeader>
      <BottomSheetContent className="px-5 pb-9">
        <ul className="flex flex-col gap-y-[15px]">
          {storeList.map((store) => (
            <li key={store.id}>
              <Link href={`#`}>
                <StoreCard {...store} />
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheetContent>
    </BottomSheet>
  );
}
