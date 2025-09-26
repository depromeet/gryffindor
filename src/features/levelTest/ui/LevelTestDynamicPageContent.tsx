import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import type { LevelTestResponse } from "../model/levelTestStore";
import { LEVEL_TEST_QUESTIONS } from "../model/levelTestStore";
import { LevelTestQuestion } from "./LevelTestQuestion";
import { LevelTestResult } from "./LevelTestResult";

// 메시지 상수
const MESSAGES = {
  LOADING: "로딩 중...",
  REDIRECTING: "리다이렉트 중...",
} as const;

interface LevelTestDynamicPageContentProps {
  currentId: string | undefined;
  parsedStep: number | null;
  totalSteps: number;
  result: LevelTestResponse | null;
  onNext: () => void;
  resultConstant: string;
}

export function LevelTestDynamicPageContent({
  currentId,
  parsedStep,
  totalSteps,
  result,
  onNext,
  resultConstant,
}: LevelTestDynamicPageContentProps) {
  // 결과 페이지
  if (currentId === resultConstant) {
    if (!result) {
      return <LoadingSpinner message={MESSAGES.REDIRECTING} />;
    }
    return <LevelTestResult result={result} />;
  }

  // 일반 단계
  if (parsedStep && parsedStep >= 1 && parsedStep <= totalSteps) {
    const question = LEVEL_TEST_QUESTIONS[parsedStep - 1];
    return (
      <LevelTestQuestion
        question={question}
        questionNumber={parsedStep}
        totalQuestions={totalSteps}
        onNext={onNext}
      />
    );
  }

  // 로딩 상태
  return <LoadingSpinner message={MESSAGES.LOADING} />;
}
