"use client";

import { BRIDGE_QUERIES } from "@bridge";
import { signInAction } from "@/features/auth/api/signInAction";
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { isNativeApp } from "@/shared/lib/utils/platformUtils";

export const useLoginApple = () => {
  const { fetchApp } = useNativeBridge();

  const loginApple = async () => {
    try {
      if (isNativeApp()) {
        const result = await fetchApp({
          query: BRIDGE_QUERIES.LOGIN_APPLE,
        });
        if (!result.token) {
          alert("Apple 로그인 정보를 받지 못했습니다. 다시 시도해주세요.");
          return;
        }

        const response = await fetch("/api/apple/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identityToken: result.token,
          }),
        });

        if (!response.ok) {
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
          return;
        }

        if (response.ok) {
          console.log("✅ 로그인 성공! 홈으로 이동합니다.");
          window.location.href = "/home?success=true";
        } else {
          const errorData = await response.json();
          console.error("❌ 백엔드 로그인 실패:", errorData);
          alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // Web: NextAuth 사용 (일반 웹 브라우저)
        console.log("🌐 웹 브라우저에서 Apple 로그인 실행");
        await signInAction("apple");
      }
    } catch (error) {
      console.error("❌ Apple 로그인 실패:", error);
    }
  };

  return {
    loginApple,
  };
};
