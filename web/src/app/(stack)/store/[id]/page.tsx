"use client";

import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { useUserState } from "@/entities/user";
import { getStoreDetail } from "@/features/store/api/getStoreDetail";
import {
  MenuSection,
  SeatImageGallery,
  SeatInfoSection,
  StoreInfo,
  SuggestionCard,
  ZoomableImage,
} from "@/features/store/ui";
import { ReviewSection } from "@/features/store/ui/ReviewSection";
import { queryKeys } from "@/shared/api";
import { TransitionLayout } from "@/shared/ui";

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params) as { id: string };
  const { userState } = useUserState();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState<string>("");

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
        <MenuSection menus={store.menus} handleSetZoomImageSrc={handleSetZoomImageSrc} />
        <SeatInfoSection seatInfo={store.seatInfo} />
        <SeatImageGallery
          storeName={store.name}
          level={userState.honbobLevel}
          userName={userState.displayName}
          seatImages={store.seatImages}
          handleSetZoomImageSrc={handleSetZoomImageSrc}
        />
        <ReviewSection storeId={store.storeId} memberId={userState?.memberId} />
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
