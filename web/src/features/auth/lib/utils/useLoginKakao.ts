"use client";

import { signInAction } from "@/features/auth/api/signInAction";
import { isNativeApp } from "@/shared/lib/utils/platformUtils";

declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; state?: string }) => void;
      };
    };
  }
}

export const useLoginKakao = () => {
  const loginKakao = async () => {
    const isNative = isNativeApp();

    try {
      if (isNative) {
        // 네이티브 웹뷰: Kakao JavaScript SDK 직접 사용
        console.log("💬 [WebView] useLoginKakao: Using Kakao JS SDK");

        if (!window.Kakao) {
          console.error("❌ Kakao SDK가 로드되지 않았습니다");
          return;
        }

        // Kakao SDK 초기화 (JavaScript Key 사용)
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (!kakaoAppKey) {
          console.error("❌ NEXT_PUBLIC_KAKAO_JS_KEY가 설정되지 않았습니다");
          return;
        }

        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoAppKey);
          console.log("✅ Kakao SDK 초기화 완료");
        }

        // 카카오 로그인 팝업 호출
        window.Kakao.Auth.authorize({
          redirectUri: `${window.location.origin}/api/auth/callback/kakao`,
        });
      } else {
        // 일반 웹 브라우저: NextAuth 사용
        console.log("💬 [Web] useLoginKakao: Using NextAuth");
        await signInAction("kakao");
      }
    } catch (error) {
      console.error("❌ Kakao 로그인 실패:", error);
    }
  };

  return {
    loginKakao,
  };
};
