"use client";

import { useMemo } from "react";
import {
  LevelTestDynamicPageContent,
  LevelTestProgress,
  useLevelTestStore,
} from "@/features/levelTest";
import { GA4_RECOMMENDED_EVENTS, useGAMount } from "@/shared/lib";
import { useLevelTestNavigation } from "@/shared/lib/hooks";
import { TransitionLayout } from "@/shared/ui";

function LevelTestContent() {
  const { currentStep, totalSteps, result, getProgress } = useLevelTestStore();
  const { currentId, parsedStep, goToNext, goToPrevious, routeConstants } =
    useLevelTestNavigation();

  const isResultPage = currentId === routeConstants.RESULT;

  const eventParams = useMemo(
    () => ({
      page_name: "level_test_result_page",
      result_level: result?.level,
      is_result_page: isResultPage,
    }),
    [result, isResultPage],
  );

  useGAMount(GA4_RECOMMENDED_EVENTS.PAGE_VIEW, eventParams, isResultPage);

  const showProgress = currentId && currentId !== routeConstants.RESULT;

  return (
    <div className="flex h-full flex-col bg-gray0 ">
      {showProgress && (
        <LevelTestProgress current={currentStep} total={totalSteps} progress={getProgress()} />
      )}
      <main className="flex-1 overflow-y-auto pb-[calc(72px+40px)]">
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
