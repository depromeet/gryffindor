"use client";

import {
  LevelTestDynamicPageContent,
  LevelTestProgress,
  useLevelTestStore,
} from "@/features/levelTest";
import { useLevelTestNavigation } from "@/shared/lib/hooks";
import { TransitionLayout } from "@/shared/ui";

function LevelTestContent() {
  const { currentStep, totalSteps, result, getProgress } = useLevelTestStore();
  const { currentId, parsedStep, goToNext, goToPrevious, routeConstants } =
    useLevelTestNavigation();

  const showProgress = currentId && currentId !== routeConstants.RESULT;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray0 px-[20px] pt-[24px] pb-[100px]">
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
  );
}

export default function LevelTestDynamicPage() {
  return (
    <TransitionLayout>
      <LevelTestContent />
    </TransitionLayout>
  );
}
