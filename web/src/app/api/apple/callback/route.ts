import { type NextRequest, NextResponse } from "next/server";
import type { LoginResponse } from "@/auth";
import { createNextAuthSessionWithCookie } from "@/shared/lib/utils/createNextAuthSession";
import type { ApiResponse } from "@/shared/model";

/**
 * Apple 로그인 처리
 * Native에서 identityToken을 받아서 백엔드로 전송
 *
 * Apple은 카카오와 달리:
 * - 카카오: code → access_token 교환 필요
 * - Apple: identityToken (JWT)을 바로 사용 가능
 */
export async function POST(request: NextRequest) {
  console.log("Apple 로그인 콜백 요청 받음");

  try {
    const body = await request.json();
    const { identityToken } = body;

    if (!identityToken) {
      return NextResponse.json({ error: "identityToken이 필요합니다" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/oauth/social-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "APPLE",
          oAuthToken: identityToken,
        }),
      },
    );

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    if (!data.response) {
      throw new Error("백엔드 로그인 실패");
    }

    //note: [GET] user/me 호출로 최신 level과 nickname 가져오기 (auth.ts의 JWT callback과 동일한 로직)
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

      console.log("✅ user/me 응답:", userMeData.response);

      // user/me의 최신 정보로 업데이트
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
      provider: "APPLE",
      redirectUrl,
    });

    return nextResponse;
  } catch (error) {
    console.error("Apple 로그인 처리 실패:", error);
    return NextResponse.json(
      { error: "Apple 로그인 실패", details: String(error) },
      { status: 500 },
    );
  }
}
