import type { Session } from "next-auth";
import { USER_CONSTANTS } from "@/shared/config/constants";
import type { UserState } from "@/shared/model";

const { DEFAULT_NICKNAME, DEFAULT_HONBAB_LEVEL } = USER_CONSTANTS;

export function deriveUserState(session: Session | null): UserState {
  // 1. 로그인 X 상태 (unauthorized)
  if (!session) {
    return {
      isLoggedIn: false,
      displayName: DEFAULT_NICKNAME,
      honbabLevel: DEFAULT_HONBAB_LEVEL,
      isLevelTestCompleted: false,
      canPostReview: false,
    };
  }

  const DoneOnboarded = session.level && session.level > 0;

  // 2. 로그인 O, 온보딩 X 상태 (don't onboarding)
  // 온보딩을 하지 않으면 honbabLevel은 /user/me 호출 res의 level은 -1로 옴.
  // auth.js의 token과 session을 통해서 가져오는 level은 0으로 옴.

  if (!DoneOnboarded) {
    return {
      isLoggedIn: true,
      displayName: session.nickName || session.user?.name || DEFAULT_NICKNAME,
      honbabLevel: DEFAULT_HONBAB_LEVEL,
      isLevelTestCompleted: false,
      canPostReview: true,
    };
  }

  // 3. 로그인 O, 온보딩 O 상태
  return {
    isLoggedIn: true,
    displayName: session.nickName || session.user?.name || DEFAULT_NICKNAME,
    honbabLevel: session.level,
    isLevelTestCompleted: true,
    canPostReview: true,
  };
}
