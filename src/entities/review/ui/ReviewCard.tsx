import Image from "next/image";
import { formatDate } from "@/shared/lib";
import { Icon, Tag } from "@/shared/ui";
import { REVIEW_KEYWORD_MAP } from "../model/constants";
import type { Review } from "../model/types";

interface ReviewCardProps {
  review: Review;
  memberId?: number;
}

export function ReviewCard({ review, memberId }: ReviewCardProps) {
  return (
    <article className="flex w-full flex-col gap-3 pb-5">
      <section className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2.5">
          {review.reviewer.profileImageUrl ? (
            <Image
              src={review.reviewer.profileImageUrl}
              alt={review.reviewer.nickname}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            // 임시 기본 이미지 -> 추후 디자이너분 시안 나오면 교체 예정
            <Icon name="lv2User" size={36} disableCurrentColor />
          )}
          <div className="flex items-center gap-1.5">
            <span className="text-body2-semibold">{review.reviewer.nickname}</span>
            <Tag label={`레벨 ${review.reviewer.level}`} color="red" size="small" />
          </div>
        </div>
        {/* 나중에 memberId로 교체 예정 */}
        {1 === review.reviewer.id && (
          <button type="button" onClick={() => {}} className="cursor-pointer">
            <Icon name="kebab" size={15} className="text-gray400" />
          </button>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-[#0E0E10] text-body2-regular">{review.content}</p>
        {review.keywords.length > 0 && (
          <div className="flex gap-2">
            {review.keywords.map((keyword) => (
              <Tag
                key={keyword}
                label={REVIEW_KEYWORD_MAP[keyword] ?? keyword}
                color="gray"
                size="small"
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <span className="text-caption1-medium text-gray400">{formatDate(review.createdAt)}</span>
      </section>
    </article>
  );
}
