"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStoreReviews } from "@/entities/review/api/reviewApi";
import type { StoreReviewResponse } from "@/entities/review/model";
import { AlreadyReviewedModal } from "@/features/review/ui";
import { useInfiniteScroll } from "@/shared/lib";
import { TextButton } from "@/shared/ui";
import { ReviewList } from "./ReviewList";

interface ReviewSectionProps {
  storeId: number;
  memberId?: number;
}

export function ReviewSection({ storeId, memberId }: ReviewSectionProps) {
  const router = useRouter();
  const [isInfiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<StoreReviewResponse>({
      queryKey: ["reviews", storeId],
      queryFn: ({ pageParam }) =>
        getStoreReviews({
          storeId,
          lastKnown: pageParam as string | undefined,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
      refetchOnMount: "always",
    });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    enabled: isInfiniteScrollEnabled,
  });

  const handleLoadMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
      setInfiniteScrollEnabled(true);
    }
  };

  const reviews = data?.pages.flatMap((page) => page.data) || [];
  const userReview = reviews.find((review) => review.reviewer.id === memberId);

  const handleWriteReviewClick = () => {
    if (userReview) {
      setIsModalOpen(true);
    } else {
      router.push(`/store/${storeId}/review`);
    }
  };

  const handleModalConfirm = () => {
    if (userReview) {
      router.push(
        `/store/${storeId}/review?reviewId=${userReview.id}&content=${
          userReview.content
        }&keywords=${userReview.keywords.join(",")}`,
      );
    }
    setIsModalOpen(false);
  };

  return (
    <section className="mt-8 flex w-full flex-col gap-4 px-5">
      <div className="flex items-center justify-between">
        <span className="text-[#000] text-subtitle1">방문 후기</span>
        <TextButton
          label="후기 작성하기"
          isIcon
          color
          rotateNumber={270}
          onClick={handleWriteReviewClick}
        />
      </div>

      <ReviewList reviews={reviews} memberId={memberId} storeId={storeId} />

      {isInfiniteScrollEnabled && hasNextPage && <div ref={loadMoreRef} />}

      {hasNextPage && !isInfiniteScrollEnabled && (
        <div className="mt-4 flex justify-center">
          <TextButton label="더보기" isIcon onClick={handleLoadMoreClick} />
        </div>
      )}
      <AlreadyReviewedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </section>
  );
}
