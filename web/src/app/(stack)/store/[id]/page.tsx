"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { use, useRef, useState } from "react";
import { useUserState } from "@/entities/user";
import { getStoreDetail } from "@/features/store/api/getStoreDetail";
import {
  MenuSection,
  SeatImageGallery,
  SeatInfoSection,
  SimilarStore,
  StoreInfo,
  SuggestionCard,
  TabNav,
  ZoomableImage,
} from "@/features/store/ui";
import { ReviewSection } from "@/features/store/ui/ReviewSection";
import { queryKeys } from "@/shared/api";
import { useSticky } from "@/shared/hooks/useSticky";
import { TransitionLayout } from "@/shared/ui";

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params) as { id: string };
  const { userState } = useUserState();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState<string>("");
  const { ref: tabNavRef, isSticky: isTabNavSticky } = useSticky(60);

  const menuRef = useRef<HTMLDivElement>(null);
  const seatRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const similarRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [menuRef, seatRef, reviewRef, similarRef];

  const handleSetZoomImageSrc = (src: string) => {
    setZoomImageSrc(src);
    setIsZoomed(true);
  };

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
        <StoreInfo {...store} handleSetZoomImageSrc={handleSetZoomImageSrc} />
        <div
          ref={tabNavRef}
          className={clsx("sticky top-[60px] z-10", {
            "bg-white": isTabNavSticky,
          })}
        >
          <TabNav sectionRefs={sectionRefs} />
        </div>
        <div ref={menuRef} className="scroll-mt-[120px]">
          <MenuSection menus={store.menus} handleSetZoomImageSrc={handleSetZoomImageSrc} />
        </div>
        <div ref={seatRef} className="scroll-mt-[120px]">
          <SeatInfoSection seatInfo={store.seatInfo} />
          <SeatImageGallery
            storeName={store.name}
            level={userState.honbobLevel}
            userName={userState.displayName}
            seatImages={store.seatImages}
            handleSetZoomImageSrc={handleSetZoomImageSrc}
          />
        </div>
        <div ref={reviewRef} className="scroll-mt-[120px]">
          <ReviewSection storeId={store.storeId} memberId={userState?.memberId} />
        </div>
        <div ref={similarRef} className="scroll-mt-[120px]">
          <SimilarStore storeId={store.storeId} />
        </div>
        <SuggestionCard storeId={store.storeId} />
        {isZoomed && (
          <ZoomableImage
            src={zoomImageSrc}
            alt={`${store.name} 좌석 이미지`}
            setIsZoomed={setIsZoomed}
          />
        )}
      </div>
    </TransitionLayout>
  );
}
