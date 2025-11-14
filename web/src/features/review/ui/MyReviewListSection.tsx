"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/entities/review/api";
import type { StoreReviewResponse } from "@/entities/review/model";
import { useUserState } from "@/entities/user/lib/hooks/useUserState";
import { ReviewList } from "@/features/store/ui/ReviewList";

export function MyReviewListSection() {
  const { userState } = useUserState();
  const memberId = userState?.memberId;

  const { data, isLoading, isError } = useInfiniteQuery<StoreReviewResponse>({
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

  if (isLoading) {
    return <div>내 리뷰를 불러오는 중...</div>;
  }

  if (isError) {
    return <div>내 리뷰를 불러오는데 오류가 발생했습니다.</div>;
  }

  if (reviews.length === 0) {
    return <div>작성한 리뷰가 없습니다.</div>;
  }

  return (
    <section className="mt-8 flex w-full flex-col px-5">
      <ReviewList reviews={reviews} memberId={memberId} />
    </section>
  );
}
