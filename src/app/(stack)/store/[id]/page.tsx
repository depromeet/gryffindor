"use client";

import { use } from "react";
import { MOCK_DATA } from "@/entities/store/model";
import { MenuItem } from "@/entities/store/ui";
import { SeatImageGallery, SeatInfoSection, StoreInfo, SuggestionCard } from "@/features/store/ui";
import { ReviewSection } from "@/features/store/ui/ReviewSection";
import { TransitionLayout } from "@/shared/ui";

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params) as { id: string };
  const store = MOCK_DATA.find((s) => s.storeId === Number(resolvedParams.id))!;

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
          level={store.level}
          userName="홍길동"
          images={store.seatImages}
        />
        <ReviewSection storeId={store.storeId} />

        <div className="px-5 pb-[59px]">
          <SuggestionCard />
        </div>
      </div>
    </TransitionLayout>
  );
}
