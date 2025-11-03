"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { postStoreSuggestion } from "@/features/store/api";
import { SuggestionImage, SuggestionModal } from "@/features/store/ui";
import { CTA, FilterSection, InputReview, TransitionLayout } from "@/shared/ui";

const SUGGESTION_KEYWORDS = ["식당 폐업", "식당 정보", "전화 번호", "위치 정보", "영업 시간"];

export default function SuggestionStorePage() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.id as string;

  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const { mutate } = useMutation({
    mutationFn: postStoreSuggestion,
    onSuccess: () => {
      setModalInfo({
        isOpen: true,
        title: "성공",
        description: "제보가 성공적으로 접수되었습니다.",
      });
    },
    onError: () => {
      setModalInfo({
        isOpen: true,
        title: "실패",
        description: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  const isDisabled = content.length < 5 || keywords.length === 0;

  const handleSubmit = () => {
    const suggestionContent = `[${keywords.join(", ")}] ${content}`;
    mutate({ storeId, content: suggestionContent });
  };

  const handleModalConfirm = () => {
    setModalInfo((prev) => ({ ...prev, isOpen: false }));
    router.back();
  };

  return (
    <TransitionLayout>
      <div className="bg-gray0 h-[calc(100vh-80px)]">
        <SuggestionImage />
        <div className="mt-[26px] w-full">
          <FilterSection
            label="제보 종류"
            options={SUGGESTION_KEYWORDS}
            selectedItems={keywords}
            onChange={setKeywords}
            isMultiple
          />
        </div>
        <div className="mt-[16px] px-5 w-full">
          <InputReview
            label="상세 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요."
          />
        </div>

        <div className="fixed right-0 bottom-0 left-0">
          <CTA primaryLabel="제보하기" onPrimary={handleSubmit} primaryDisabled={isDisabled} />
        </div>
      </div>
      <SuggestionModal
        isOpen={modalInfo.isOpen}
        onOpenChange={(isOpen) => setModalInfo((prev) => ({ ...prev, isOpen }))}
        title={modalInfo.title}
        description={modalInfo.description}
        onConfirm={handleModalConfirm}
      />
    </TransitionLayout>
  );
}
