"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterSection, Icon, Modal, TransitionLayout } from "@/shared/ui";
import { CTA } from "@/shared/ui/CTA";
import { InputReview } from "@/shared/ui/InputReview";

const FILTERS = ["빠른 회전율", "넓은 매장", "친절한 응대", "저렴한 한끼", "보증된 맛"];

const KEYWORD_MAP: { [key: string]: string } = {
  "빠른 회전율": "QUICK_TURNOVER",
  "넓은 매장": "SPACIOUS_INTERIOR",
  "친절한 응대": "FRIENDLY_SERVICE",
  "저렴한 한끼": "CHEAP_MEAL",
  "보증된 맛": "BEST_TASTE",
};

const REVERSE_KEYWORD_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(KEYWORD_MAP).map(([key, value]) => [value, key]),
);

export default function ReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const initialContent = searchParams.get("content") || "";
  const initialKeywordsParam = searchParams.get("keywords") || "";

  const isEditMode = !!(initialContent || initialKeywordsParam);
  const title = isEditMode ? "방문 후기 수정" : "방문 후기";

  const getInitialFilters = () => {
    if (!initialKeywordsParam) return [];
    const englishKeywords = initialKeywordsParam.split(",");
    return englishKeywords.map((kw) => REVERSE_KEYWORD_MAP[kw]).filter(Boolean);
  };

  const [selectedFilters, setSelectedFilters] = useState<string[]>(getInitialFilters());
  const [review, setReview] = useState(initialContent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (items: string[]) => {
    setSelectedFilters(items);
  };

  const handleSubmit = () => {
    const storeId = Number(params.id);
    const mappedKeywords = selectedFilters.map((filter) => KEYWORD_MAP[filter]);

    const payload = {
      storeId,
      content: review,
      keywords: mappedKeywords,
    };

    console.log(payload);
    setIsModalOpen(true);
  };

  return (
    <TransitionLayout dynamicTitle={title}>
      <div className="flex min-h-screen w-full flex-col bg-gray0">
        <FilterSection
          label="대표 키워드"
          options={FILTERS}
          selectedItems={selectedFilters}
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
          <Modal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="후기 작성 완료"
            description="후기 작성이 완료되었습니다."
          >
            <div className="flex min-w-[260px] flex-col items-center justify-center gap-6 rounded-lg bg-white p-4">
              <button
                type="button"
                className="mb-[-24px] flex h-5 w-full justify-end"
                onClick={() => setIsModalOpen(false)}
              >
                <Icon name="close" size={24} className="cursor-pointer text-gray400" />
              </button>
              <Icon name="lv4User" size={120} disableCurrentColor />
              <span className="whitespace-pre-line text-center text-gray900 text-subtitle1">
                {isEditMode ? "방문 후기를 수정했어요!" : `방문 후기\n작성이 완료되었어요!`}
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-[51px] w-full items-center justify-center rounded-[8px] bg-primary400 py-[14px]"
              >
                <span className="text-body1-semibold text-gray0">확인</span>
              </button>
            </div>
          </Modal>
        )}
      </div>
    </TransitionLayout>
  );
}
