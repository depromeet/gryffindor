"use client";

import {
  LevelTestDynamicPageContent,
  LevelTestProgress,
  useLevelTestStore,
} from "@/features/levelTest";
import { useLevelTestNavigation } from "@/shared/lib/hooks";
import { TransitionLayout } from "@/shared/ui";

export default function LevelTestDynamicPage() {
  const { currentStep, totalSteps, result, getProgress } = useLevelTestStore();
  const { currentId, parsedStep, goToNext, goToPrevious, routeConstants } =
    useLevelTestNavigation();

  const showProgress = currentId && currentId !== routeConstants.RESULT;

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gray0 px-[20px] pt-[24px] pb-[100px]">
        {showProgress && (
          <LevelTestProgress current={currentStep} total={totalSteps} progress={getProgress()} />
        )}
        <main className="mt-4">
          <LevelTestDynamicPageContent
            currentId={currentId}
            parsedStep={parsedStep}
            totalSteps={totalSteps}
            result={result}
            onNext={goToNext}
            onPrevious={goToPrevious}
            resultConstant={routeConstants.RESULT}
          />
        </main>
      </div>
    </TransitionLayout>
  );
}
