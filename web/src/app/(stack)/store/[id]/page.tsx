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
import { CUSTOM_EVENTS, useGAInView } from "@/shared/lib";
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

  // GA 섹션 뷰포트 추적 (50% 보일 때, 한 번만)

  const menuTrackingRef = useGAInView<HTMLDivElement>({
    eventName: CUSTOM_EVENTS.SECTION_VISIBLE,
    params: {
      section_name: "menu",
      store_id: resolvedParams.id,
    },
    threshold: 0.5,
    once: true,
    enabled: !!store,
  });

  const seatTrackingRef = useGAInView<HTMLDivElement>({
    eventName: CUSTOM_EVENTS.SECTION_VISIBLE,
    params: {
      section_name: "seat_info",
      store_id: resolvedParams.id,
    },
    threshold: 0.5,
    once: true,
    enabled: !!store,
  });

  const reviewTrackingRef = useGAInView<HTMLDivElement>({
    eventName: CUSTOM_EVENTS.SECTION_VISIBLE,
    params: {
      section_name: "review",
      store_id: resolvedParams.id,
    },
    threshold: 0.5,
    once: true,
    enabled: !!store,
  });

  const similarTrackingRef = useGAInView<HTMLDivElement>({
    eventName: CUSTOM_EVENTS.SECTION_VISIBLE,
    params: {
      section_name: "similar_store",
      store_id: resolvedParams.id,
    },
    threshold: 0.5,
    once: true,
    enabled: !!store,
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
          className={clsx("sticky top-[0px] z-10", {
            "bg-white": isTabNavSticky,
          })}
        >
          <TabNav sectionRefs={sectionRefs} />
        </div>
        <div
          ref={(el) => {
            menuRef.current = el;
            menuTrackingRef.current = el;
          }}
          className="scroll-mt-[120px]"
        >
          <MenuSection menus={store.menus} handleSetZoomImageSrc={handleSetZoomImageSrc} />
        </div>
        <div
          ref={(el) => {
            seatRef.current = el;
            seatTrackingRef.current = el;
          }}
          className="scroll-mt-[120px]"
        >
          <SeatInfoSection seatInfo={store.seatInfo} />
          <SeatImageGallery
            storeName={store.name}
            level={userState.honbobLevel}
            userName={userState.displayName}
            seatImages={store.seatImages}
            handleSetZoomImageSrc={handleSetZoomImageSrc}
          />
        </div>
        <div
          ref={(el) => {
            reviewRef.current = el;
            reviewTrackingRef.current = el;
          }}
          className="scroll-mt-[120px]"
        >
          <ReviewSection storeId={store.storeId} memberId={userState?.memberId} />
        </div>
        <div
          ref={(el) => {
            similarRef.current = el;
            similarTrackingRef.current = el;
          }}
          className="scroll-mt-[120px]"
        >
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
