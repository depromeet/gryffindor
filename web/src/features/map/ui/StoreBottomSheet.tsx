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
import { StationDropdown } from "./StationDropdown";

interface StoreBottomSheetProps {
  storeList: StoreListResponseData[];
  isCollapsed: boolean;
}

export function StoreBottomSheet({ storeList, isCollapsed }: StoreBottomSheetProps) {
  const { selectedStoreId } = useMapStore();

  const selectedStoreInfo = selectedStoreId
    ? storeList.find((store) => store.id === selectedStoreId)
    : null;

  const safeBottom = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom"),
  );

  // 바텀시트 높이: 마커 선택(245px) | 드래그 중(95px) | 기본(310px) + Safe Area
  const height = (selectedStoreId ? 245 : isCollapsed ? 95 : 310) + safeBottom;

  const renderStoreContent = () => {
    if (selectedStoreInfo) {
      return (
        <Link href={`/store/${selectedStoreInfo.id}`}>
          <StoreCard {...selectedStoreInfo} />
        </Link>
      );
    }

    return (
      <div className="flex flex-col gap-5">
        <StationDropdown />
        <ul className="flex w-full flex-col gap-y-[15px]">
          {storeList.map((store) => (
            <li key={store.id}>
              <Link href={`/store/${store.id}`}>
                <StoreCard {...store} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <BottomSheet isFixed={false} isOpen={storeList.length > 0} initialHeight={height}>
      <BottomSheetHeader>
        <BottomSheetHandler />
      </BottomSheetHeader>
      <BottomSheetContent>
        <div className="px-5 pb-20">{renderStoreContent()}</div>
      </BottomSheetContent>
    </BottomSheet>
  );
}
