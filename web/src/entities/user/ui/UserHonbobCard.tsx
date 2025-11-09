"use client";

import { honbobLevelCardList } from "@/entities/honbob";
import { Icon } from "@/shared/ui";
import { useUserState } from "../lib/hooks/useUserState";

export function UserHonbobCard() {
  const { userState } = useUserState();
  const userLevel = userState.honbobLevel;

  const honbobLevelInfo = honbobLevelCardList[userLevel as keyof typeof honbobLevelCardList];

  const { honbobLevelTitle } = honbobLevelInfo as { honbobLevelTitle: string };

  return (
    <div className="bg-white rounded-[6px] flex items-center w-fit gap-x-[8px] px-[6px] py-[4px]">
      <div className="flex items-center gap-x-[4px]">
        <Icon name="crown" size={16} color="primary400" />
        <p className="justify-start text-red-500 text-xs font-bold font-['Pretendard'] leading-4">
          {`레벨 ${userState.honbobLevel}`}
        </p>
      </div>
      <div className="flex items-center">
        <p className="justify-start text-gray600 text-xs font-bold leading-4">
          {`${honbobLevelTitle}`}
        </p>
        <Icon name="colorRightChevron" size={16} color="gray600" />
      </div>
    </div>
  );
}
