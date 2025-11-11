"use client";

import { useRouter } from "next/navigation";
import { HonbobLevelCarousel } from "@/entities/honbob";
import { TextButton, TransitionLayout } from "@/shared/ui";

export default function HonbobLevelInfoPage() {
  const router = useRouter();

  return (
    <TransitionLayout>
      <HonbobLevelCarousel />
      <div className="flex justify-center pt-[46px] pb-[28px]">
        <TextButton
          label="레벨테스트 다시하기"
          isUnderline
          color="gray"
          isIcon={false}
          onClick={() => router.push("/level-test")}
        />
      </div>
    </TransitionLayout>
  );
}
