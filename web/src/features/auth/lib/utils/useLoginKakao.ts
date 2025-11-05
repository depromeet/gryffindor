"use client";

import { BRIDGE_QUERIES } from "@bridge";
import { signInAction } from "@/features/auth/api/signInAction";
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { isNativeApp } from "@/shared/lib/utils/platformUtils";

export const useLoginKakao = () => {
  const { fetchApp } = useNativeBridge();

  const loginKakao = async () => {
    console.log("💬 useLoginKakao: loginKakao function called");
    const isNative = isNativeApp();
    console.log("💬 useLoginKakao: isNativeApp() =", isNative);
    try {
      if (isNative) {
        console.log("💬 useLoginKakao: Native environment detected, calling fetchApp");
        const result = await fetchApp({
          query: BRIDGE_QUERIES.LOGIN_KAKAO,
        });
        console.log("💬 useLoginKakao: fetchApp result received", {
          success: result.success,
          hasUrl: !!result.url,
        });

        if (result.success) {
          if (result.url) {
            console.log("🔗 카카오 로그인 URL로 이동:", result.url);
            window.location.href = result.url;
            // 카카오는 인증 후 /api/kakao/callback으로 리다이렉트됨
          } else {
            // url이 빈 문자열이면 카카오톡 앱으로 열었음
            // 카카오톡 앱에서 인증 후 redirect_uri로 리다이렉트되면 WebView로 돌아옴
            console.log("📱 카카오톡 앱으로 열었습니다. 인증 후 WebView로 돌아옵니다.");
          }
        }
      } else {
        // Web: NextAuth 사용 (일반 웹 브라우저)
        console.log("🌐 웹 브라우저에서 Kakao 로그인 실행");
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
