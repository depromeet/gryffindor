"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LEVEL_TEST_QUESTIONS,
  LevelTestProgress,
  LevelTestQuestion,
  LevelTestResult,
  useLevelTestStore,
} from "@/features/levelTest";
import { TransitionLayout } from "@/shared/ui";

export default function LevelTestDynamicPage() {
  const router = useRouter();
  const params = useParams();

  const { currentStep, totalSteps, result, setCurrentStep, getProgress } = useLevelTestStore();

  const id = params.id as string[];
  const currentId = id?.[0];

  useEffect(() => {
    if (currentId === "result") {
      return;
    }

    if (currentId) {
      const step = parseInt(currentId, 10);
      if (step >= 1 && step <= totalSteps && step !== currentStep) {
        setCurrentStep(step);
      }
    }
  }, [currentId, currentStep, totalSteps, setCurrentStep]);

  const goToNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      router.push(`/level-test/${nextStep}`);
    } else {
      router.push("/level-test/result");
    }
  };

  useEffect(() => {
    if (currentId && currentId !== "result") {
      const step = parseInt(currentId, 10);
      if (step < 1 || step > totalSteps) {
        router.push("/level-test/1");
      }
    }
  }, [currentId, totalSteps, router]);

  const renderContent = () => {
    if (currentId === "result") {
      if (!result) {
        router.push("/level-test/1");
        return <div>리다이렉트 중...</div>;
      }
      return <LevelTestResult result={result} />;
    }

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

    return <div>로딩 중...</div>;
  };

  const showProgress = currentId && currentId !== "result";

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gray50 px-[20px] pt-[24px]">
        {showProgress && (
          <LevelTestProgress current={currentStep} total={totalSteps} progress={getProgress()} />
        )}
        <div className="">{renderContent()}</div>
      </div>
    </TransitionLayout>
  );
}
