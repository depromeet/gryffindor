"use client";

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

  const showProgress = currentId && currentId !== routeConstants.RESULT;

  // 페이지 마운트 추적 (currentId가 변경될 때마다 새로운 이벤트 전송)
  useGAMount(GA4_RECOMMENDED_EVENTS.PAGE_VIEW, {
    page_name: "level_test_page",
    page_id: currentId,
    step: parsedStep?.toString() ?? "",
    total_steps: totalSteps,
    is_result_page: currentId === routeConstants.RESULT,
  });

  return (
    <div className="flex h-full flex-col bg-gray0 px-[20px]">
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
