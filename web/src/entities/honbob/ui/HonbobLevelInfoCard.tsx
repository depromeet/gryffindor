import { SAMPLE_LEVEL_INFO } from "@/entities/honbob";
import { useUserState } from "@/entities/user";

export function HonbobLevelInfoCard() {
  const { userState } = useUserState();
  const userLevel = userState.honbobLevel;

  const honbobLevelInfo = SAMPLE_LEVEL_INFO[userLevel as keyof typeof SAMPLE_LEVEL_INFO];

  const { level, description, recommendedMenu, recommendedStore } = honbobLevelInfo;

  return (
    <div className="mx-[24px] flex flex-col gap-y-[16px] rounded-[16px] border border-gray100 p-[20px]">
      <div className="flex flex-col gap-y-[4px]">
        <span className="text-primary400 text-subtitle1">
          {userState.isLevelTestCompleted ? level : "나의 혼밥 레벨은?"}
        </span>
        <span className="text-body2-medium text-gray700">
          {userState.isLoggedIn
            ? description
            : "로그인 후 레벨테스트로 나만의 맞춤 식당을 추천받아요"}
        </span>
      </div>
      <hr className="w-full border-gray100 h-px" />
      <div className="flex flex-col gap-y-[12px]">
        <div className="flex flex-col gap-y-[2px]">
          <span className="text-body3-semibold text-gray600">추천 메뉴</span>
          <span className="text-body3-regular text-gray900">
            {userState.isLevelTestCompleted ? recommendedMenu : "-"}
          </span>
        </div>
        <div className="flex flex-col gap-y-[2px]">
          <span className="text-body3-semibold text-gray600">추천 좌석</span>
          <span className="text-body3-regular text-gray900">
            {userState.isLevelTestCompleted ? recommendedStore : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
