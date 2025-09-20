"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LEVEL_TEST_QUESTIONS, useLevelTestStore } from "@/features/levelTest/model/levelTestStore";
import { LevelTestProgress } from "@/features/levelTest/ui/LevelTestProgress";
import { LevelTestQuestion } from "@/features/levelTest/ui/LevelTestQuestion";
import { LevelTestResult } from "@/features/levelTest/ui/LevelTestResult";
import { TransitionLayout } from "@/shared/ui";

export default function LevelTestDynamicPage() {
  const router = useRouter();
  const params = useParams();

  const { currentStep, totalSteps, result, setCurrentStep, getProgress, resetTest } =
    useLevelTestStore();

  const id = params.id as string[];
  const currentId = id?.[0];

  // URL 파라미터 기반으로 상태 동기화
  useEffect(() => {
    if (currentId === "result") {
      return; // 결과 페이지는 그대로 유지
    }

    if (currentId) {
      const step = parseInt(currentId, 10);
      if (step >= 1 && step <= totalSteps && step !== currentStep) {
        setCurrentStep(step);
      }
    }
  }, [currentId, currentStep, totalSteps, setCurrentStep]);

  // 다음 단계로 이동
  const goToNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      router.push(`/level-test/${nextStep}`);
    } else {
      // 결과 계산 후 결과 페이지로 이동
      router.push("/level-test/result");
    }
  };

  // 처음부터 다시 시작
  const restartTest = () => {
    resetTest();
    router.push("/level-test/1");
  };

  // 현재 표시할 컨텐츠 결정
  const renderContent = () => {
    // 결과 페이지
    if (currentId === "result" && result) {
      return <LevelTestResult result={result} onRestart={restartTest} />;
    }

    // 질문 단계
    const step = parseInt(currentId || "1", 10);
    if (step >= 1 && step <= totalSteps) {
      const question = LEVEL_TEST_QUESTIONS[step - 1];
      return (
        <LevelTestQuestion
          question={question}
          questionNumber={step}
          totalQuestions={totalSteps}
          onNext={goToNext}
        />
      );
    }

    // 유효하지 않은 경우 첫 번째 질문으로 리다이렉트
    router.push("/level-test/1");
    return null;
  };

  const showProgress = currentId && currentId !== "result";

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gray-50">
        {showProgress && (
          <LevelTestProgress current={currentStep} total={totalSteps} progress={getProgress()} />
        )}
        <div className="px-4 py-6">{renderContent()}</div>
      </div>
    </TransitionLayout>
  );
}
