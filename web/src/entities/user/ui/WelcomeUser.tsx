"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserState } from "@/entities/user";

import { UserHonbobCard } from "./UserHonbobCard";

export function WelcomeUser() {
  const { userState } = useUserState();

  return (
    <div className="flex justify-between items-end gap-x-[16px]">
      <div className="flex pt-[13px] flex-col pb-[12px] gap-y-[12px]">
        <Link href="#">
          {/* todo: 레벨 소개 페이지로 이동해야합니다. */}
          <UserHonbobCard />
        </Link>
        <span className="text-gray900 text-xl leading-7">
          <strong className="text-primary400">{`${userState.displayName}`}</strong>님
          <br /> 혼밥 식당을 추천드려요
        </span>
      </div>
      <Image
        src={userState.honbobLevelCharacterImage}
        alt="honbobLevelCharacterImage"
        width={110}
        height={116}
        className="self-end pr-[16px]"
      />
    </div>
  );
}
