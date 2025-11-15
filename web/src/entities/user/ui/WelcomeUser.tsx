"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserState } from "@/entities/user";
import { GA4_RECOMMENDED_EVENTS, getHonbobLevelImageSet, useGAClick } from "@/shared/lib";

import { UserHonbobCard } from "./UserHonbobCard";

export function WelcomeUser() {
  const { userState } = useUserState();
  const { homeCharacterImage } = getHonbobLevelImageSet(userState.honbobLevel);

  const trackHonbobLevelCardClick = useGAClick(GA4_RECOMMENDED_EVENTS.SELECT_CONTENT, {
    select_content_type: "click_honbob_level_card",
  });

  return (
    <div className="flex justify-between items-end gap-x-[16px]">
      <div className="flex pt-[13px] flex-col pb-[12px] gap-y-[12px]">
        <Link
          href={`/honbob-level-info`}
          onClick={() => trackHonbobLevelCardClick({ honbob_level: userState.honbobLevel })}
        >
          <UserHonbobCard />
        </Link>
        <span className="text-gray900 text-xl leading-7">
          <strong className="text-primary400">{`${userState.displayName}`}</strong>님
          <br /> 혼밥 식당을 추천드려요
        </span>
      </div>
      <Image
        src={homeCharacterImage}
        alt="honbobLevelCharacterImage"
        width={110}
        height={116}
        className="self-end pr-[16px]"
      />
    </div>
  );
}
