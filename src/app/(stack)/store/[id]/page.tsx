"use client";

import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { MenuItem } from "@/entities/store/ui";
import { useUserState } from "@/entities/user";
import { getStoreDetail } from "@/features/store/api/getStoreDetail";
import { SeatImageGallery, SeatInfoSection, StoreInfo, SuggestionCard } from "@/features/store/ui";
import { ReviewSection } from "@/features/store/ui/ReviewSection";
import { queryKeys } from "@/shared/api";
import { TransitionLayout } from "@/shared/ui";

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params) as { id: string };
  const { userState } = useUserState();

  const { data: store, isLoading } = useQuery({
    queryKey: queryKeys.STORE_DETAIL(resolvedParams.id),
    queryFn: () => getStoreDetail(resolvedParams.id),
    enabled: !!resolvedParams.id,
  });

  if (isLoading || !store) {
    return (
      <TransitionLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div>로딩 중...</div>
        </div>
      </TransitionLayout>
    );
  }

  return (
    <TransitionLayout dynamicTitle={store.name}>
      <div className="flex flex-col bg-gray0">
        <StoreInfo {...store} />
        <div className="h-1 w-full bg-gray50"></div>
        <article className="mt-5 flex w-full flex-col gap-3 pl-5">
          <span className="text-[#000] text-subtitle1">혼밥 메뉴</span>
          <div className="flex flex-col gap-3">
            {store.menus.map((menu) => (
              <MenuItem key={menu.name} {...menu} />
            ))}
          </div>
        </article>
        <SeatInfoSection seatInfo={store.seatInfo} />
        <SeatImageGallery
          storeName={store.name}
          level={userState.honbabLevel}
          userName={userState.displayName}
          seatImages={store.seatImages}
        />
        <ReviewSection storeId={store.storeId} memberId={userState?.memberId} />
        <SuggestionCard />
      </div>
    </TransitionLayout>
  );
}
