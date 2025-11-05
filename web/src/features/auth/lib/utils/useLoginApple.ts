"use client";

import { BRIDGE_QUERIES } from "@bridge";
import { signInAction } from "@/features/auth/api/signInAction";
import { useNativeBridge } from "@/shared/lib/hooks/useNativeBridge";
import { isNativeApp } from "@/shared/lib/utils/platformUtils";

export const useLoginApple = () => {
  const { fetchApp } = useNativeBridge();

  const loginApple = async () => {
    console.log("🍎 useLoginApple: loginApple function called");
    const isNative = isNativeApp();
    console.log("🍎 useLoginApple: isNativeApp() =", isNative, {
      hasWindow: typeof window !== "undefined",
      hasReactNativeWebView:
        typeof window !== "undefined" && typeof (window as any).ReactNativeWebView !== "undefined",
    });
    try {
      if (isNative) {
        console.log("🍎 useLoginApple: Native environment detected, calling fetchApp");
        const result = await fetchApp({
          query: BRIDGE_QUERIES.LOGIN_APPLE,
        });
        console.log("🍎 useLoginApple: fetchApp result received", { hasToken: !!result.token });
        if (!result.token) {
          alert("Apple 로그인 정보를 받지 못했습니다. 다시 시도해주세요.");
          return;
        }

        console.log("🍎 useLoginApple: /api/apple/callback 호출 중...");
        const response = await fetch("/api/apple/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identityToken: result.token,
          }),
        });

        console.log("🍎 useLoginApple: /api/apple/callback 응답 받음", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        });

        if (!response.ok) {
          // 에러 응답 파싱 시도
          let errorDetails = "서버 오류가 발생했습니다.";
          try {
            const errorData = await response.json();
            console.error("🍎 useLoginApple: 서버 에러 응답:", errorData);
            errorDetails = errorData.details || errorData.error || errorDetails;
          } catch (parseError) {
            const errorText = await response.text();
            console.error("🍎 useLoginApple: 에러 응답 파싱 실패:", errorText);
            errorDetails = errorText || errorDetails;
          }
          console.error("🍎 useLoginApple: 로그인 실패", {
            status: response.status,
            errorDetails,
          });
          alert(`서버 오류가 발생했습니다: ${errorDetails}`);
          return;
        }

        // POST 요청이지만 서버에서 redirect를 반환하므로,
        // fetch는 리다이렉트를 자동으로 따라가지 않음
        // 따라서 수동으로 리다이렉트 필요
        console.log("✅ 로그인 성공! 홈으로 이동합니다.");
        window.location.href = "/home?success=true";
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
