import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteReview } from "@/entities/review/api/reviewApi";
import { DeleteModal } from "@/features/review/ui";
import { formatDate } from "@/shared/lib";
import defaultProfile from "@/shared/lib/assets/png/character/basic.png";
import { Icon, SelectPopover, Tag } from "@/shared/ui";
import { REVIEW_KEYWORD_EN_KO_MAP } from "../model/constants";
import type { Review } from "../model/types";

interface ReviewCardProps {
  review: Review;
  memberId?: number;
  storeId: number;
}

export function ReviewCard({ review, storeId, memberId }: ReviewCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteReview(review.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", storeId] });
      setIsDeleteModalOpen(false);
    },
  });

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handleEdit = () => {
    const params = new URLSearchParams();
    params.set("reviewId", review.id.toString());
    params.set("content", review.content);
    params.set("keywords", review.keywords.join(","));

    router.push(`/store/${storeId}/review?${params.toString()}`);
    setIsPopoverOpen(false);
  };

  const handleDelete = () => {
    setIsPopoverOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    mutate();
  };

  return (
    <article className="flex w-full flex-col gap-3 pb-5">
      <section className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src={
              review.reviewer.profileImageUrl &&
              !review.reviewer.profileImageUrl.includes("example.com")
                ? review.reviewer.profileImageUrl
                : defaultProfile
            }
            alt={review.reviewer.nickname || "User profile image"}
            width={36}
            height={36}
            className="rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = defaultProfile.src;
            }}
          />
          <div className="flex items-center gap-1.5">
            <span className="text-body2-semibold">{review.reviewer.nickname}</span>
            <Tag label={`레벨 ${review.reviewer.honbobLevel}`} color="red" size="small" />
          </div>
        </div>
        {memberId === review.reviewer.id && (
          <div className="relative">
            <button type="button" onClick={handleTogglePopover} className="cursor-pointer">
              <Icon name="kebab" size={15} className="text-gray400" />
            </button>
            {isPopoverOpen && (
              <div className="absolute top-full right-29 mt-2">
                <SelectPopover onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            )}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-[#0E0E10] text-body2-regular">{review.content}</p>
        {review.keywords.length > 0 && (
          <div className="flex gap-2">
            {review.keywords.map((keyword) => (
              <Tag
                key={keyword}
                label={REVIEW_KEYWORD_EN_KO_MAP[keyword] ?? keyword}
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

      {isDeleteModalOpen && (
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </article>
  );
}
