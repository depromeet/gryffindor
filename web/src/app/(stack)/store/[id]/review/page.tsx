"use client";

import { useReviewForm } from "@/features/review/lib/hook/useReviewForm";
import { ConfirmModal } from "@/features/review/ui";
import { FilterSection, InputReview, TransitionLayout } from "@/shared/ui";
import { CTA } from "@/shared/ui/CTA";

export default function ReviewPage() {
  const {
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
  } = useReviewForm();

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
            onClose={handleModalClose}
          />
        )}
      </div>
    </TransitionLayout>
  );
}
