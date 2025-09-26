"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLevelTestStore } from "@/features/levelTest";

export default function LevelTestIndexPage() {
  const router = useRouter();
  const { resetTest } = useLevelTestStore();

  useEffect(() => {
    resetTest();
    router.replace("/level-test/1");
  }, [router, resetTest]);

  return null;
}
