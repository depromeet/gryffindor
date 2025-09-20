import type { Review } from "@/entities/review/model";
import { ReviewCard } from "@/entities/review/ui";

interface ReviewSectionProps {
  reviews: Review[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
}

export function ReviewSection({ reviews, loadMoreRef }: ReviewSectionProps) {
  return (
    <article className="mt-8 flex w-full flex-col gap-4 px-5">
      <div className="flex items-center justify-between">
        <span className="text-[#000] text-subtitle1">방문 후기</span>
      </div>

      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
            <div className="mt-5 h-[1px] w-full bg-gray50" />
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} />
    </article>
  );
}
