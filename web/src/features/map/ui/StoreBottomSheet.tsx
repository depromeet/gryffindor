"use client";

import Link from "next/link";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { StoreCard } from "@/entities/storeList/ui";
import { useMapStore } from "@/features/map/model";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
} from "@/shared/ui";

interface StoreBottomSheetProps {
  storeList: StoreListResponseData[];
  isCollapsed: boolean;
}

export function StoreBottomSheet({ storeList, isCollapsed }: StoreBottomSheetProps) {
  const { selectedStoreId } = useMapStore();

  const selectedStoreInfo = selectedStoreId
    ? storeList.find((store) => store.id === selectedStoreId)
    : null;

  // 마커 선택 시, 바텀시트 높이 257px
  // 지도 드래그 중일 때는 100px, 그 외는 270px
  const height = selectedStoreId ? 257 : isCollapsed ? 100 : 270;

  return (
    <BottomSheet isFixed={false} isOpen={storeList.length > 0} initialHeight={height}>
      <BottomSheetHeader>
        <BottomSheetHandler />
      </BottomSheetHeader>
      <BottomSheetContent className="!px-5 !pb-9">
        {selectedStoreInfo ? (
          <Link href={`/store/${selectedStoreInfo.id}`}>
            <StoreCard {...selectedStoreInfo} />
          </Link>
        ) : (
          <ul className="flex w-full flex-col gap-y-[15px]">
            {storeList.map((store) => (
              <li key={store.id}>
                <Link href={`/store/${store.id}`}>
                  <StoreCard {...store} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </BottomSheetContent>
    </BottomSheet>
  );
}
