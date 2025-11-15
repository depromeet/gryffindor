"use client";

import { useRouter } from "next/navigation";
import { HonbobLevelCarousel } from "@/entities/honbob";
import { useUserState } from "@/entities/user";
import { GA4_RECOMMENDED_EVENTS, useGAClick } from "@/shared/lib";
import { TextButton, TransitionLayout } from "@/shared/ui";

export default function HonbobLevelInfoPage() {
  const { userState } = useUserState();
  const router = useRouter();

  const trackMenuClick = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT, {
    select_content_type: "click_re_level_test",
    at: "honbob_level_info_page",
    user_level: userState.honbobLevel,
  });

  return (
    <TransitionLayout>
      <HonbobLevelCarousel />
      <div className="flex justify-center pt-[46px] pb-[28px]">
        <TextButton
          label="레벨테스트 다시하기"
          isUnderline
          color="gray"
          isIcon={false}
          onClick={() => {
            trackMenuClick();
            router.push("/level-test");
          }}
        />
      </div>
    </TransitionLayout>
  );
}
