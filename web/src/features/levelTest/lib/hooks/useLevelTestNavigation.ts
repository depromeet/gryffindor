import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useLevelTestStore } from "@/features/levelTest";

// 상수 정의
const ROUTE_CONSTANTS = {
  RESULT: "result",
  BASE_PATH: "/level-test",
  DEFAULT_STEP: 1,
} as const;

// 라우팅 로직을 담당하는 커스텀 훅
export function useLevelTestNavigation() {
  const router = useRouter();
  const params = useParams();
  const { currentStep, totalSteps, setCurrentStep } = useLevelTestStore();

  const id = params.id as string[];
  const currentId = id?.[0];

  // 현재 단계 파싱
  const parsedStep = (() => {
    if (!currentId || currentId === ROUTE_CONSTANTS.RESULT) {
      return null;
    }
    const step = parseInt(currentId, 10);
    return Number.isNaN(step) ? null : step;
  })();

  // 단계 유효성 검사
  const isValidStep = useCallback((step: number) => step >= 1 && step <= totalSteps, [totalSteps]);

  // 네비게이션 함수들
  const navigateToStep = useCallback(
    (step: number) => {
      router.push(`${ROUTE_CONSTANTS.BASE_PATH}/${step}`);
    },
    [router],
  );

  const navigateToResult = useCallback(() => {
    router.push(`${ROUTE_CONSTANTS.BASE_PATH}/${ROUTE_CONSTANTS.RESULT}`);
  }, [router]);

  const goToNext = useCallback(() => {
    const nextStep = currentStep + 1;
    if (nextStep <= totalSteps) {
      navigateToStep(nextStep);
    } else {
      navigateToResult();
    }
  }, [currentStep, totalSteps, navigateToStep, navigateToResult]);

  // 라우팅 효과 처리
  useEffect(() => {
    if (currentId === ROUTE_CONSTANTS.RESULT) return;

    if (!parsedStep || !isValidStep(parsedStep)) {
      navigateToStep(ROUTE_CONSTANTS.DEFAULT_STEP);
      return;
    }

    if (parsedStep !== currentStep) {
      setCurrentStep(parsedStep);
    }
  }, [currentId, parsedStep, currentStep, isValidStep, navigateToStep, setCurrentStep]);

  return {
    currentId,
    parsedStep,
    goToNext,
    routeConstants: ROUTE_CONSTANTS,
  };
}
