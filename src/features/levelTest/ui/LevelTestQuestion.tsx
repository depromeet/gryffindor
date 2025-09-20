"use client";

import { useState } from "react";
import { type Question, useLevelTestStore } from "@/features/levelTest/model/levelTestStore";

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
  const { setAnswer, calculateResult } = useLevelTestStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    let newSelection: string[];

    if (question.type === "single") {
      newSelection = [optionId];
      setSelectedOptions(newSelection);
      setAnswer(question.id, newSelection);

      // 단일 선택의 경우 선택 후 잠시 후 자동으로 다음으로 이동
      setTimeout(() => {
        handleNext();
      }, 500);
    } else {
      // multiple choice
      newSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];

      setSelectedOptions(newSelection);
      setAnswer(question.id, newSelection);
    }
  };

  const handleNext = () => {
    // 마지막 질문이면 결과 계산
    if (questionNumber === totalQuestions) {
      calculateResult();
    }

    onNext();
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6">
        <h2 className="mb-6 font-semibold text-gray-900 text-lg leading-relaxed">
          Q{questionNumber}
        </h2>
        <h3 className="mb-8 font-bold text-gray-900 text-xl leading-relaxed">
          {question.question}
        </h3>
      </div>

      <div className="mb-8 space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-red-500 bg-red-50 text-red-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-red-500 bg-red-500" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <span className="leading-relaxed">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
