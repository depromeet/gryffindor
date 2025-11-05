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
          let errorMessage = "서버 오류가 발생했습니다.";
          let errorDetails: any = null;

          try {
            const errorData = await response.json();
            console.error("🍎 useLoginApple: 서버 에러 응답:", errorData);

            // 에러 데이터 구조화
            errorMessage = errorData.message || errorData.error || errorMessage;
            errorDetails = errorData.details || errorData;

            // 서버 로그 확인 (프로덕션에서도 포함됨)
            const serverLogs = errorData.logs || [];

            // 프로덕션에서도 상세 에러 표시 (디버깅용)
            const fullErrorText = JSON.stringify(errorData, null, 2);

            console.error("🍎 useLoginApple: 로그인 실패", {
              status: response.status,
              errorMessage,
              errorDetails,
              fullError: fullErrorText,
              serverLogs: serverLogs.length > 0 ? `서버 로그 ${serverLogs.length}개` : "없음",
            });

            // 서버 로그가 있으면 콘솔에 출력
            if (serverLogs.length > 0) {
              console.group("📋 서버 로그 (시간순)");
              serverLogs.forEach((log: any, index: number) => {
                const logMethod =
                  log.level === "error"
                    ? console.error
                    : log.level === "warn"
                      ? console.warn
                      : console.log;
                logMethod(`[${index + 1}] [${log.level}] ${log.message}`, log.data);
              });
              console.groupEnd();
            }

            // 프로덕션에서도 상세 에러 정보 표시 (디버깅용)
            const logsText =
              serverLogs.length > 0
                ? `\n\n서버 로그 (${serverLogs.length}개):\n` +
                  serverLogs
                    .map((log: any, i: number) => `[${i + 1}] [${log.level}] ${log.message}`)
                    .join("\n")
                : "";

            // 프로덕션에서도 상세 alert 표시 (디버깅용)
            const showDetailedAlert = true; // 프로덕션에서도 상세 alert 표시
            if (showDetailedAlert) {
              alert(
                `서버 오류 발생 (${response.status})\n\n` +
                  `메시지: ${errorMessage}\n\n` +
                  `상세 정보:\n${fullErrorText}${logsText}\n\n` +
                  `콘솔에서 더 자세한 정보를 확인하세요.`,
              );
            } else {
              // 간단한 메시지만 표시하고 싶을 때
              alert(`서버 오류가 발생했습니다: ${errorMessage}`);
            }

            // 에러를 클립보드에 복사할 수 있도록 (프로덕션에서도)
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              try {
                const clipboardText =
                  serverLogs.length > 0
                    ? `=== 서버 로그 ===\n${JSON.stringify(serverLogs, null, 2)}\n\n=== 에러 정보 ===\n${fullErrorText}`
                    : fullErrorText;
                await navigator.clipboard.writeText(clipboardText);
                console.log("📋 에러 정보와 서버 로그가 클립보드에 복사되었습니다.");
              } catch (clipboardError) {
                console.warn("📋 클립보드 복사 실패:", clipboardError);
              }
            }
          } catch (parseError) {
            const errorText = await response.text();
            console.error("🍎 useLoginApple: 에러 응답 파싱 실패:", errorText);
            errorMessage = errorText || errorMessage;
            alert(`서버 오류가 발생했습니다: ${errorMessage}`);
          }

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
