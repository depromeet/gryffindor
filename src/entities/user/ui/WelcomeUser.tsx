"use client";

import Image from "next/image";
import { useUserState } from "@/entities/user";

export function WelcomeUser() {
  const { userState } = useUserState();

  return (
    <div className="flex items-start gap-x-[16px]">
      <Image
        src={userState.honbabLevelIcon}
        alt="honbobLevelIcon"
        width={80}
        height={80}
        className="rounded-full"
      />
      <span className="text-gray900 text-title1">
        <strong className="text-primary400">{`Lv.${userState.honbabLevel} ${userState.displayName}`}</strong>
        님을 위한
        <br /> 식당만 선별했어요
      </span>
    </div>
  );
}
