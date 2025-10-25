"use client";

import { useRouter } from "next/navigation";
import { UserProfileInfo, useUserState } from "@/entities/user";
import { RoundButton } from "@/shared/ui";

export function UserProfileSection() {
  const router = useRouter();

  const { userState } = useUserState();

  return (
    <div className="mx-[24px] flex items-center justify-between gap-x-[8px]">
      <UserProfileInfo />
      {userState.isLoggedIn && (
        <RoundButton
          label="닉네임 변경"
          onClick={() => {
            router.push("/mypage/nickname");
          }}
        />
      )}
    </div>
  );
}
