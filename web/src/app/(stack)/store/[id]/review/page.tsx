"use client";

import { useRouter } from "next/navigation";
import { LoginRequiredModal } from "@/features/report/ui/LoginRequiredModal";
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
    isLoginModalOpen,
    setIsLoginModalOpen,
    handleSubmit,
    handleModalClose,
  } = useReviewForm();

  const router = useRouter();

  return (
    <TransitionLayout dynamicTitle={title}>
      <div className="flex h-[calc(100vh-80px)] w-full flex-col bg-gray0">
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
        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            router.back();
          }}
          setIsLoginModalOpen={setIsLoginModalOpen}
          text="방문 후기"
        />
      </div>
    </TransitionLayout>
  );
}
