import type { Session } from "next-auth";
import { USER_CONSTANTS } from "@/shared/config/constants";
import type { UserState } from "@/shared/model";

const { DEFAULT_NICKNAME, DEFAULT_HONBOB_LEVEL } = USER_CONSTANTS;

export function deriveUserState(session: Session | null): UserState {
  console.log("🔍 [deriveUserState] 호출됨", {
    hasSession: !!session,
    session: session
      ? {
          memberId: session.memberId,
          nickName: session.nickName,
          level: session.level,
          userName: session.user?.name,
          userEmail: session.user?.email,
        }
      : null,
  });

  if (!session) {
    // 1. 로그인 X 상태 (unauthorized)
    console.log("❌ [deriveUserState] 세션 없음 - 비로그인 상태 반환");
    return {
      isLoggedIn: false,
      displayName: DEFAULT_NICKNAME,
      honbobLevel: DEFAULT_HONBOB_LEVEL,
      isLevelTestCompleted: false,
      canPostReview: false,
    };
  }

  const DoneOnboarded = session.level && session.level > 0;
  console.log("🎯 [deriveUserState] 온보딩 완료 여부:", {
    DoneOnboarded,
    level: session.level,
    hasLevel: !!session.level,
    levelGreaterThanZero: session.level > 0,
  });

  if (!DoneOnboarded) {
    // 2. 로그인 O, 온보딩 X 상태 (don't onboarding)
    // 온보딩을 하지 않으면 honbobLevel은 /user/me 호출 res의 level은 -1로 옴.
    // auth.js의 token과 session을 통해서 가져오는 level은 0으로 옴.
    console.log("⚠️ [deriveUserState] 온보딩 미완료 상태 반환");

    const userState = {
      isLoggedIn: true,
      memberId: session.memberId,
      displayName: session.nickName || session.user?.name || DEFAULT_NICKNAME,
      honbobLevel: DEFAULT_HONBOB_LEVEL,
      isLevelTestCompleted: false,
      canPostReview: true,
    };
    console.log("⚠️ [deriveUserState] 반환값:", userState);
    return userState;
  }

  // 3. 로그인 O, 온보딩 O 상태
  console.log("✅ [deriveUserState] 온보딩 완료 상태 반환");

  const userState = {
    isLoggedIn: true,
    memberId: session.memberId,
    displayName: session.nickName || session.user?.name || DEFAULT_NICKNAME,
    honbobLevel: session.level,
    isLevelTestCompleted: true,
    canPostReview: true,
  };

  console.log("✅ [deriveUserState] 반환값:", userState);
  return userState;
}
