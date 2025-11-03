import { type NextRequest, NextResponse } from "next/server";
import type { LoginResponse } from "@/auth";
import { exchangeKakaoCodeForToken } from "@/features/auth";
import { createNextAuthSessionWithCookie } from "@/shared/lib/utils/createNextAuthSession";
import type { ApiResponse } from "@/shared/model";

export async function GET(request: NextRequest) {
  console.log("카카오 로그인 콜백 요청 받음");

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    console.error("카카오 로그인 에러:", {
      error,
      errorDescription,
    });

    const errorUrl = new URL("/login", request.url);
    errorUrl.searchParams.set("error", error);

    if (errorDescription) {
      errorUrl.searchParams.set("error_description", errorDescription);
    }

    return NextResponse.redirect(errorUrl);
  }

  if (code) {
    try {
      const accessToken = await exchangeKakaoCodeForToken(code);

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

      const data = (await backendResponse.json()) as ApiResponse<LoginResponse>;

      if (!data.response) {
        throw new Error("백엔드 로그인 실패");
      }

      // [GET] user/me 호출로 최신 level과 nickname 가져오기 (auth.ts의 JWT callback과 동일한 로직)
      let loginResponseWithUserMe = data.response;
      try {
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

        if (userMeData.response) {
          loginResponseWithUserMe = {
            ...data.response,
            level: userMeData.response.level,
            nickName: userMeData.response.nickname,
          };
        }
      } catch (error) {
        console.error("user/me 호출 실패 (기본 응답 사용):", error);
        // user/me 호출 실패해도 기본 응답으로 진행
      }

      // NextAuth 세션 생성 및 쿠키 설정 (통합 함수)
      const redirectUrl = new URL(`/home?success=true`, request.url);
      const nextResponse = await createNextAuthSessionWithCookie({
        loginResponse: loginResponseWithUserMe,
        provider: "KAKAO",
        redirectUrl,
      });

      return nextResponse;
    } catch (error) {
      console.error("❌ 카카오 로그인 처리 실패:", error);
      const errorUrl = new URL("/login", request.url);
      errorUrl.searchParams.set("error", "kakao_login_failed");

      return NextResponse.redirect(errorUrl);
    }
  }

  // 코드와 에러 모두 없는 경우
  console.warn("⚠️ 예상치 못한 리다이렉트:", {
    code,
    error,
    searchParams: Object.fromEntries(searchParams.entries()),
  });

  const errorUrl = new URL("/login", request.url);
  errorUrl.searchParams.set("error", "unknown");

  return NextResponse.redirect(errorUrl);
}
