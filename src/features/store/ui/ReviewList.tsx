import type { Review } from "@/entities/review/model";
import { ReviewCard } from "@/entities/review/ui";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flex flex-col gap-5">
      {reviews.map((review) => (
        <div key={review.id}>
          <ReviewCard review={review} />
          <div className="mt-5 h-[1px] w-full bg-gray50" />
        </div>
      ))}
    </div>
  );
}
