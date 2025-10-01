"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createReview, updateReview } from "@/entities/review/api/reviewApi";
import {
  REVIEW_FILTERS,
  REVIEW_KEYWORD_EN_KO_MAP,
  REVIEW_KEYWORD_KO_EN_MAP,
} from "@/entities/review/model/constants";

export function useReviewForm() {
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

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["reviews", params.id] });
    setIsModalOpen(true);
  };

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: onMutationSuccess,
  });

  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: onMutationSuccess,
  });

  const handleFilterChange = (items: string[]) => {
    const englishKeys = items.map((itemText) => {
      const fullFilter = REVIEW_FILTERS.find((f) => f.includes(itemText));
      return fullFilter ? REVIEW_KEYWORD_KO_EN_MAP[fullFilter] : "";
    });
    setSelectedFilters(englishKeys.filter(Boolean));
  };

  const selectedTextOnlyFilters = selectedFilters
    .map((key) => {
      const fullFilter = REVIEW_KEYWORD_EN_KO_MAP[key];
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

  const handleModalClose = () => {
    router.push(`/store/${params.id}`);
  };

  return {
    title,
    isEditMode,
    selectedFilters,
    review,
    setReview,
    isModalOpen,
    setIsModalOpen,
    textOnlyFilters,
    handleFilterChange,
    selectedTextOnlyFilters,
    handleSubmit,
    handleModalClose,
  };
}
