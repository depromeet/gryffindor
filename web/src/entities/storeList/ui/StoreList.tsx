"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { storeListApi } from "@/entities/storeList/api";
import { getDefaultStationCenter } from "@/entities/storeList/lib";
import { useUserState } from "@/entities/user";
import { queryKeys } from "@/shared/api";
import { useInfiniteScroll } from "@/shared/lib";
import { useLocationStore } from "@/shared/store";
import { StoreCard } from "./StoreCard";
import { StoreLevelList } from "./StoreLevelList";

export function StoreList() {
  const { userState } = useUserState();
  const { selectedStation } = useLocationStore();

  const [selectedLevel, setSelectedLevel] = useState(userState.honbobLevel);
  const handleLevelChange = (level: number) => {
    setSelectedLevel(level);
  };

  const centerLatLonInfo = getDefaultStationCenter(selectedStation);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: queryKeys.STORE_LIST(selectedStation, selectedLevel),
      queryFn: ({ pageParam }) =>
        storeListApi.getStoreByPost({
          requestBody: {
            center: {
              lat: centerLatLonInfo.lat,
              lon: centerLatLonInfo.lon,
            },
            filters: {
              honbobLevel: selectedLevel,
            },
            paging: {
              limit: 10,
              lastKnown: pageParam as string | undefined,
            },
          },
        }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => {
        return lastPage.response?.nextCursor && lastPage.response?.hasNext
          ? lastPage.response.nextCursor
          : undefined;
      },
    });

  const loadMoreTriggerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    enabled: !isLoading && !error,
  });

  const storeList = data?.pages.flatMap((page) => page.response?.data || []) || [];

  return (
    <div className="flex flex-col bg-gray0 pb-[20px]">
      <StoreLevelList userLevel={selectedLevel} onLevelChange={handleLevelChange} />
      {isLoading && (
        <div className="flex h-full min-h-[calc(100vh-380px)] flex-col items-center justify-center bg-gray0 px-[20px]">
          <span className="text-body2 text-gray500">로딩 중...</span>
        </div>
      )}
      {error && (
        <div className="flex h-full min-h-[calc(100vh-380px)] flex-col items-center justify-center bg-gray0 px-[20px]">
          <span className="text-body2 text-red500">데이터를 불러오는데 실패했습니다.</span>
        </div>
      )}
      <ul className="flex flex-col gap-y-[15px] px-[20px]">
        {storeList?.map((store) => (
          <li key={store.id}>
            <Link href={`/store/${store.id}`}>
              <StoreCard {...store} />
            </Link>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div ref={loadMoreTriggerRef} className="flex items-center justify-center py-4">
          {isFetchingNextPage && (
            <div className="text-body2 text-gray500">더 많은 매장을 불러오는 중...</div>
          )}
        </div>
      )}
    </div>
  );
}
