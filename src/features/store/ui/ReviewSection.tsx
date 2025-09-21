"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchReviews } from "@/entities/review/api/mock";
import { useInfiniteScroll } from "@/shared/lib";
import { TextButton } from "@/shared/ui";
import { ReviewList } from "./ReviewList";

interface ReviewSectionProps {
  storeId: number;
}

export function ReviewSection({ storeId }: ReviewSectionProps) {
  const [isInfiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["reviews", storeId],
    queryFn: ({ pageParam }) => fetchReviews({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <section className="mt-8 flex w-full flex-col gap-4 px-5">
      <div className="flex items-center justify-between">
        <span className="text-[#000] text-subtitle1">방문 후기</span>
      </div>

      <ReviewList reviews={reviews} />

      {isInfiniteScrollEnabled && hasNextPage && <div ref={loadMoreRef} />}

      {hasNextPage && !isInfiniteScrollEnabled && (
        <div className="mt-4 flex justify-center">
          <TextButton label="더보기" isIcon onClick={handleLoadMoreClick} />
        </div>
      )}
    </section>
  );
}
