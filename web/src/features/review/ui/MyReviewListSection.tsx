"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMyReviews } from "@/entities/review/api";
import type { StoreReviewResponse } from "@/entities/review/model";
import { useUserState } from "@/entities/user/lib/hooks/useUserState";
import { ReviewList } from "@/features/store/ui/ReviewList";
import { TextButton } from "@/shared/ui";
import { DefaultReview } from "./DefaultReview";

export function MyReviewListSection() {
  const { userState } = useUserState();
  const memberId = userState?.memberId;
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<StoreReviewResponse>({
      queryKey: ["myReviews", memberId],
      queryFn: ({ pageParam }) =>
        getMyReviews({
          memberId: memberId as number,
          lastKnown: pageParam as string | undefined,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
      enabled: !!memberId,
    });

  const reviews = data?.pages.flatMap((page) => page.data) || [];
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
    setShowAll(true);
  };

  if (isLoading) {
    return <div>내 리뷰를 불러오는 중...</div>;
  }

  if (isError) {
    return <div>내 리뷰를 불러오는데 오류가 발생했습니다.</div>;
  }

  return (
    <section className="mt-8 flex w-full flex-col px-5">
      {reviews.length === 0 ? (
        <DefaultReview />
      ) : (
        <>
          <ReviewList reviews={visibleReviews} memberId={memberId} />
          {reviews.length > 3 && !showAll && (
            <div className="mt-4 flex justify-center">
              <TextButton label="더보기" isIcon onClick={handleLoadMore} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
