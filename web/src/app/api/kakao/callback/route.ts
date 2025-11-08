import { type NextRequest, NextResponse } from "next/server";
import type { LoginResponse } from "@/auth";
import { exchangeKakaoCodeForToken } from "@/features/auth";
import { createNextAuthSessionWithCookie } from "@/shared/lib/utils/createNextAuthSession";
import type { ApiResponse } from "@/shared/model";

export async function GET(request: NextRequest) {
  // 로그 수집을 위한 배열 (프로덕션에서도 수집)
  const logs: Array<{ timestamp: string; level: string; message: string; data?: any }> = [];
  // 프로덕션에서도 로그를 클라이언트로 전달 (디버깅용)
  const shouldSendLogs = true; // 프로덕션에서도 로그 전달

  const addLog = (level: string, message: string, data?: any) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
    logs.push(logEntry);
    // 실제 콘솔에도 출력
    if (level === "error") {
      console.error(message, data);
    } else if (level === "warn") {
      console.warn(message, data);
    } else {
      console.log(message, data);
    }
  };

  addLog("info", "💬 [API] 카카오 로그인 콜백 요청 받음");

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    addLog("error", "💬 [API] 카카오 로그인 에러", {
      error,
      errorDescription,
    });

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", error);

    if (errorDescription) {
      errorUrl.searchParams.set("error_description", errorDescription);
    }

    // 로그 포함 (프로덕션에서도 전달)
    if (shouldSendLogs && logs.length > 0) {
      errorUrl.searchParams.set("logs", encodeURIComponent(JSON.stringify(logs)));
    }

    return NextResponse.redirect(errorUrl);
  }

  if (code) {
    try {
      addLog("info", "💬 [API] 카카오 코드로 토큰 교환 시작");
      // 요청의 origin을 사용하여 redirect URI 구성 (프론트엔드와 동일한 URI 사용)
      const redirectUri = `${new URL(request.url).origin}/api/kakao/callback`;
      addLog("info", `💬 [API] Redirect URI: ${redirectUri}`);
      const accessToken = await exchangeKakaoCodeForToken(code, redirectUri);
      addLog("info", "💬 [API] 카카오 토큰 교환 완료");

      addLog("info", "💬 [API] 백엔드로 social-login 요청 전송 중...");
      const backendResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/oauth/social-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: "KAKAO",
            oAuthToken: accessToken,
          }),
        },
      );

      addLog("info", "💬 [API] 백엔드 응답 파싱 중...");
      const data = (await backendResponse.json()) as ApiResponse<LoginResponse>;

      if (!data.response) {
        addLog("error", "💬 [API] 백엔드 응답 실패: response가 없습니다", data);
        throw new Error("백엔드 로그인 실패");
      }

      addLog("info", "💬 [API] 백엔드 응답 파싱 완료", {
        hasResponse: !!data.response,
        hasAccessToken: !!data.response?.accessToken,
      });

      // [GET] user/me 호출로 최신 level과 nickname 가져오기 (auth.ts의 JWT callback과 동일한 로직)
      let loginResponseWithUserMe = data.response;
      try {
        addLog("info", "💬 [API] user/me 호출 중...");
        const userMeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${data.response.accessToken}`,
            },
          },
        );

        const userMeData = (await userMeResponse.json()) as ApiResponse<{
          level: number;
          nickname: string;
        }>;

        addLog("info", "✅ user/me 응답", userMeData.response);

        if (userMeData.response) {
          loginResponseWithUserMe = {
            ...data.response,
            level: userMeData.response.level,
            nickName: userMeData.response.nickname,
          };
        }
      } catch (error) {
        addLog("error", "user/me 호출 실패 (기본 응답 사용)", error);
        // user/me 호출 실패해도 기본 응답으로 진행
      }

      // NextAuth 세션 생성 및 쿠키 설정 (통합 함수)
      addLog("info", "💬 [API] NextAuth 세션 생성 시작");
      const redirectUrl = new URL(`/home?success=true`, request.url);

      // 디버그 모드 확인
      const url = new URL(request.url);
      if (url.searchParams.get("debug") === "true") {
        // 디버그 모드에서는 로그를 포함한 JSON 응답 반환 (테스트용)
        return NextResponse.json({
          success: true,
          logs,
          message: "로그인 성공 (디버그 모드)",
        });
      }

      const nextResponse = await createNextAuthSessionWithCookie({
        loginResponse: loginResponseWithUserMe,
        provider: "KAKAO",
        redirectUrl,
      });

      addLog("info", "💬 [API] NextAuth 세션 생성 완료, 리다이렉트 응답 반환");
      return nextResponse;
    } catch (error) {
      addLog("error", "❌ 카카오 로그인 처리 실패", error);

      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorUrl = new URL("/login", request.url);
      errorUrl.searchParams.set("error", "kakao_login_failed");
      errorUrl.searchParams.set("error_message", encodeURIComponent(errorMessage));

      // 로그 포함 (프로덕션에서도 전달)
      if (shouldSendLogs && logs.length > 0) {
        errorUrl.searchParams.set("logs", encodeURIComponent(JSON.stringify(logs)));
      }

      return NextResponse.redirect(errorUrl);
    }
  }

  // 코드와 에러 모두 없는 경우
  addLog("warn", "⚠️ 예상치 못한 리다이렉트", {
    code,
    error,
    searchParams: Object.fromEntries(searchParams.entries()),
  });

  const errorUrl = new URL("/login", request.url);
  errorUrl.searchParams.set("error", "unknown");

  // 로그 포함 (프로덕션에서도 전달)
  if (shouldSendLogs && logs.length > 0) {
    errorUrl.searchParams.set("logs", encodeURIComponent(JSON.stringify(logs)));
  }

  return NextResponse.redirect(errorUrl);
}
