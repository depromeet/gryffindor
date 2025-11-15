"use client";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, Icon } from "@/shared/ui";
import { onBoardingApi } from "../api/onBoardingApi";
import { type Question, useLevelTestStore } from "../model/levelTestStore";

interface LevelTestQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function LevelTestQuestion({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
}: LevelTestQuestionProps) {
  const { setAnswer, setResult, getBackendRequestData, getAnswer } = useLevelTestStore();
  const { update } = useSession();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // 이전 답변 불러오기
  useEffect(() => {
    const previousAnswer = getAnswer(question.id);
    if (previousAnswer) {
      setSelectedOptions(previousAnswer.selectedOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [question.id, getAnswer]);

  const onBoardingMutation = useMutation({
    mutationFn: onBoardingApi.createOnBoarding,
    onSuccess: async (response) => {
      console.log("✅ [LevelTest] 온보딩 완료", { level: response.response.level });
      setResult({ level: response.response.level });

      // NextAuth 세션 업데이트 - auth.ts의 jwt 콜백에서 user/me 호출됨
      console.log("🔄 [LevelTest] 세션 업데이트 트리거");
      await update({
        level: response.response.level,
      });
      console.log("✅ [LevelTest] 세션 업데이트 완료");

      onNext();
    },
    onError: (error) => {
      console.error("❌ [LevelTest] 온보딩 제출 오류:", error);
    },
  });

  const handleOptionSelect = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(newSelection);
    setAnswer(question.id, newSelection);
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    if (questionNumber === totalQuestions) {
      const requestData = getBackendRequestData();
      onBoardingMutation.mutate({ answers: requestData.answers });
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const isNextDisabled = selectedOptions.length === 0 || onBoardingMutation.isPending;
  const isPreviousDisabled = questionNumber === 1 || onBoardingMutation.isPending;

  return (
    <div className="mx-auto px-[20px]">
      <div className="my-[40px] flex flex-col gap-[13px]">
        <h2 className="text-title2">Q{questionNumber}</h2>
        <h3 className="text-title1">{question.question}</h3>
      </div>

      <div className="space-y-[20px]">
        {question.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionSelect(option.id)}
              className={`h-[72px] w-full rounded-[12px] border-[1px] px-[20px] py-[24px] text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary400 bg-primary100 text-primary500"
                  : "border-gray-200 bg-gray0 text-gray900 hover:border-gray-300 hover:bg-gray-50"
              }`}
              disabled={onBoardingMutation.isPending}
            >
              <div className="flex items-center gap-[12px]">
                {isSelected ? (
                  <Icon
                    name="check"
                    color="primary500"
                    className="h-[24px] w-[24px]"
                    disableCurrentColor
                  />
                ) : (
                  <Icon name="selectCheck" className="h-[24px] w-[24px]" disableCurrentColor />
                )}
                <span className="text-body1-semibold">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {onBoardingMutation.isPending && (
        <div className="mt-4 text-center text-gray-500">결과를 계산 중입니다...</div>
      )}

      {/* 이전/다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex gap-[12px] bg-gray0 px-[20px] pt-[20px] pb-safe fixed-bottom-bar">
        <Button
          label="이전"
          variant="secondary"
          fullWidth
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        />
        <Button
          label={questionNumber === totalQuestions ? "결과 보기" : "다음"}
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
