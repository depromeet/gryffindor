"use client";

import Link from "next/link";
import type { StoreSearchResponse } from "@/entities/storeList/api";
import { SelectedStorePreviewCard, StorePreviewCard } from "@/entities/storeList/ui";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
} from "@/shared/ui";

interface StoreBottomSheetProps {
  storeList: StoreSearchResponse[];
  selectedStoreId: number | null;
}

export function StoreBottomSheet({ storeList, selectedStoreId }: StoreBottomSheetProps) {
  if (selectedStoreId) {
    const selectedStoreInfo = storeList.find((store) => store.id === selectedStoreId);
    if (selectedStoreInfo) return <SelectedStorePreviewCard {...selectedStoreInfo} />;
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
                <StorePreviewCard {...store} />
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheetContent>
    </BottomSheet>
  );
}
