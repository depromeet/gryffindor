"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StoreListResponseData } from "@/entities/storeList/api";
import { StoreCard } from "@/entities/storeList/ui";
import { useMapStore } from "@/features/map/model";
import { GA4_RECOMMENDED_EVENTS, useGAClick } from "@/shared/lib";
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
  onStationChange: () => void;
  onHeightChange: (height: number) => void;
}

export function StoreBottomSheet({
  storeList,
  isCollapsed,
  onStationChange,
  onHeightChange,
}: StoreBottomSheetProps) {
  const { selectedStoreId } = useMapStore();
  const [safeBottom, setSafeBottom] = useState(0);

  // 바텀시트 높이: 마커 선택(245px) | 드래그 중(95px) | 기본(310px) + Safe Area
  const height = (selectedStoreId ? 245 : isCollapsed ? 95 : 310) + safeBottom;

  const selectedStoreInfo = selectedStoreId
    ? storeList.find((store) => store.id === selectedStoreId)
    : null;

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      "--safe-area-inset-bottom",
    );
    setSafeBottom(parseFloat(value));
  }, []);

  // TODO: 임시 구현, 나중에 Observer로 개선 예정
  useEffect(() => {
    if (storeList.length === 0) {
      onHeightChange(0);
      return;
    }

    onHeightChange(height);
  }, [height, onHeightChange, storeList.length]);

  const trackNextStoreLinkClick = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT, {
    page_path: "/map",
  });

  const renderStoreContent = () => {
    if (selectedStoreInfo) {
      return (
        <Link
          href={`/store/${selectedStoreInfo.id}`}
          onClick={() =>
            trackNextStoreLinkClick({
              select_content_type: "click_move_to_store_link",
              at: "store_bottom_sheet_selected_store",
              move_to_link_url: `/store/${selectedStoreInfo.id}`,
              move_to_store_id: selectedStoreInfo.id,
              move_to_store_name: selectedStoreInfo.name,
            })
          }
        >
          <StoreCard {...selectedStoreInfo} />
        </Link>
      );
    }

    return (
      <div className="flex flex-col gap-5">
        <StationDropdown onStationChange={onStationChange} />
        <ul className="flex w-full flex-col gap-y-[15px]">
          {storeList.map((store) => (
            <li key={store.id}>
              <Link
                href={`/store/${store.id}`}
                onClick={() =>
                  trackNextStoreLinkClick({
                    select_content_type: "click_move_to_store_link",
                    at: "store_bottom_sheet_store_list",
                    move_to_link_url: `/store/${store.id}`,
                    move_to_store_id: store.id,
                    move_to_store_name: store.name,
                  })
                }
              >
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
