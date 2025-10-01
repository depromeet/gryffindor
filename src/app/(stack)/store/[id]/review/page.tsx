"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createReview, updateReview } from "@/entities/review/api/reviewApi";
import { KEYWORD_MAP, REVIEW_FILTERS } from "@/entities/review/model/constants";
import { ConfirmModal } from "@/features/review/ui";
import { FilterSection, InputReview, TransitionLayout } from "@/shared/ui";
import { CTA } from "@/shared/ui/CTA";

const REVERSE_KEYWORD_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(KEYWORD_MAP).map(([key, value]) => [value, key]),
);

export default function ReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialContent = searchParams.get("content") || "";
  const initialKeywordsParam = searchParams.get("keywords") || "";
  const reviewId = searchParams.get("reviewId");

  const isEditMode = !!reviewId;
  const title = isEditMode ? "방문 후기 수정" : "방문 후기";

  const getInitialFilters = () => {
    if (!initialKeywordsParam) return [];
    return initialKeywordsParam.split(",");
  };

  const [selectedFilters, setSelectedFilters] = useState<string[]>(getInitialFilters());

  const [review, setReview] = useState(initialContent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const textOnlyFilters = REVIEW_FILTERS.map((filter) => filter.split(" ").slice(1).join(" "));

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", params.id] });
      setIsModalOpen(true);
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", params.id] });
      setIsModalOpen(true);
    },
  });

  const handleFilterChange = (items: string[]) => {
    const englishKeys = items.map((itemText) => {
      const fullFilter = REVIEW_FILTERS.find((f) => f.includes(itemText));
      return fullFilter ? KEYWORD_MAP[fullFilter] : "";
    });
    setSelectedFilters(englishKeys.filter(Boolean));
  };

  const selectedTextOnlyFilters = selectedFilters
    .map((key) => {
      const fullFilter = REVERSE_KEYWORD_MAP[key];
      return fullFilter ? fullFilter.split(" ").slice(1).join(" ") : "";
    })
    .filter(Boolean);

  const handleSubmit = () => {
    if (isEditMode) {
      updateReviewMutation.mutate({
        reviewId: Number(reviewId),
        review: { content: review, keywords: selectedFilters },
      });
    } else {
      createReviewMutation.mutate({
        storeId: Number(params.id),
        content: review,
        keywords: selectedFilters,
      });
    }
  };

  return (
    <TransitionLayout dynamicTitle={title}>
      <div className="flex min-h-screen w-full flex-col bg-gray0">
        <FilterSection
          label="대표 키워드"
          options={textOnlyFilters}
          selectedItems={selectedTextOnlyFilters}
          onChange={handleFilterChange}
          isMultiple
        />
        <div className="mt-9 px-5">
          <InputReview
            label="후기"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="후기를 작성해주세요."
          />
        </div>
        <div className="fixed right-0 bottom-0 left-0">
          <CTA
            primaryLabel="완료"
            onPrimary={handleSubmit}
            primaryDisabled={!(selectedFilters.length && review.length >= 5)}
          />
        </div>
        {isModalOpen && (
          <ConfirmModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isEditMode={isEditMode}
            onClose={() => router.push(`/store/${params.id}`)}
          />
        )}
      </div>
    </TransitionLayout>
  );
}
