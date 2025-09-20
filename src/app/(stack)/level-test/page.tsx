"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLevelTestStore } from "@/features/levelTest/model/levelTestStore";

export default function LevelTestIndexPage() {
  const router = useRouter();
  const { currentStep, resetTest } = useLevelTestStore();

  useEffect(() => {
    // 저장된 진행상황이 있으면 해당 단계로, 없으면 처음부터 시작
    if (currentStep > 1) {
      router.replace(`/level-test/${currentStep}`);
    } else {
      resetTest(); // 처음부터 시작할 때 상태 초기화
      router.replace("/level-test/1");
    }
  }, [currentStep, router, resetTest]);

  // 리다이렉트 중이므로 빈 화면 표시
  return null;
}
