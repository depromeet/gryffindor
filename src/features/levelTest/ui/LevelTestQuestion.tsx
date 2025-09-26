"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@/shared/ui";
import { onBoardingApi } from "../api/onBoardingApi";
import { type Question, useLevelTestStore } from "../model/levelTestStore";

interface LevelTestQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
}

export function LevelTestQuestion({
  question,
  questionNumber,
  totalQuestions,
  onNext,
}: LevelTestQuestionProps) {
  const { setAnswer, setResult, getBackendRequestData } = useLevelTestStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const onBoardingMutation = useMutation({
    mutationFn: onBoardingApi.createOnBoarding,
    onSuccess: (response) => {
      setResult({ level: response.response.level });
      onNext();
    },
    onError: (error) => {
      console.error("온보딩 제출 오류:", error);
    },
  });

  const handleOptionSelect = (optionId: string) => {
    let newSelection: string[];

    if (question.type === "single") {
      newSelection = [optionId];
      setSelectedOptions(newSelection);
      setAnswer(question.id, newSelection);

      setTimeout(() => {
        handleNext();
      }, 500);
    } else {
      newSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];

      setSelectedOptions(newSelection);
      setAnswer(question.id, newSelection);
    }
  };

  const handleNext = () => {
    if (questionNumber === totalQuestions) {
      const requestData = getBackendRequestData();
      onBoardingMutation.mutate({ answers: requestData.answers });
    } else {
      onNext();
    }
  };

  return (
    <div className="mx-auto">
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
                  : "border-gray-200 bg-gray50 text-gray900 hover:border-gray-300 hover:bg-gray-50"
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
    </div>
  );
}
