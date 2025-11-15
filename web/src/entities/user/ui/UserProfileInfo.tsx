import Image from "next/image";
import Link from "next/link";
import { getHonbobLevelImageSet } from "@/shared/lib";
import { Icon, Tag } from "@/shared/ui";
import { useUserState } from "../lib/hooks/useUserState";

export function UserProfileInfo() {
  const { userState } = useUserState();
  const { isLoggedIn, honbobLevel, displayName, isLevelTestCompleted } = userState;
  const { profileImage } = getHonbobLevelImageSet(honbobLevel);

  return (
    <div className="flex items-center gap-x-[8px]">
      {!isLoggedIn && <Icon name="user" size={72} disableCurrentColor />}
      {isLoggedIn && !isLevelTestCompleted && (
        <Icon name="userLogin" size={72} disableCurrentColor />
      )}
      {isLevelTestCompleted && (
        <Image
          src={profileImage}
          alt={`honbobLevelIcon-${honbobLevel}`}
          width={72}
          height={72}
          className="rounded-full"
        />
      )}
      {isLoggedIn && (
        <div className="flex flex-col gap-y-[8px]">
          <Tag color="red" size="small" label={`레벨${honbobLevel}`} />
          <span className="text-gray900 text-title2">{displayName}</span>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex flex-col gap-y-[4px]">
          <div className="flex items-center">
            <Link href="/login">
              <span>로그인</span>
            </Link>
            <Icon name="leftArrow" disableCurrentColor size={12} className="rotate-180" />
          </div>
          <span className="text-body2-regular text-gray600">
            로그인하고 다양한 서비스를 이용해보세요.
          </span>
        </div>
      )}
    </div>
  );
}
