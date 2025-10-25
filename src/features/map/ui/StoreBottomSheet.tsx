"use client";

import Link from "next/link";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { SelectedStoreCard, StoreCard } from "@/entities/storeList/ui";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
} from "@/shared/ui";
import { useMapStore } from "../model";

export function StoreBottomSheet({ storeList }: { storeList: StoreListResponseData[] }) {
  const { selectedStoreId } = useMapStore();

  if (selectedStoreId) {
    const selectedStoreInfo = storeList.find((store) => store.id === selectedStoreId);
    if (selectedStoreInfo)
      return (
        <Link href={`/store/${selectedStoreInfo.id}`} className="px-4">
          <SelectedStoreCard {...selectedStoreInfo} />
        </Link>
      );
  }

  return (
    <BottomSheet isFixed={false} isOpen={true} initialHeight={226}>
      <BottomSheetHeader>
        <BottomSheetHandler />
      </BottomSheetHeader>
      <BottomSheetContent className="!px-5 !pb-9">
        <ul className="flex w-full flex-col gap-y-[15px]">
          {storeList.map((store) => (
            <li key={store.id}>
              <Link href={`/store/${store.id}`}>
                <StoreCard {...store} />
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheetContent>
    </BottomSheet>
  );
}
