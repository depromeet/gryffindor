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

  addLog("info", "🍎 [API] Apple 로그인 콜백 요청 받음");

  try {
    const body = await request.json();
    const { identityToken } = body;

    addLog("info", "🍎 [API] Request body received", {
      hasIdentityToken: !!identityToken,
      identityTokenLength: identityToken?.length || 0,
    });

    if (!identityToken) {
      addLog("error", "🍎 [API] identityToken이 없습니다");
      return NextResponse.json(
        {
          error: "identityToken이 필요합니다",
          stage: "validation",
          timestamp: new Date().toISOString(),
          ...(shouldSendLogs && { logs }),
        },
        { status: 400 },
      );
    }

    addLog("info", "🍎 [API] 백엔드로 social-login 요청 전송 중...");
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

    addLog("info", "🍎 [API] 백엔드 응답 상태", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      addLog("error", "🍎 [API] 백엔드 응답 실패", {
        status: response.status,
        errorText,
      });
      throw new Error(`백엔드 로그인 실패 (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    addLog("info", "🍎 [API] 백엔드 응답 파싱 완료", {
      hasResponse: !!data.response,
      hasAccessToken: !!data.response?.accessToken,
    });

    if (!data.response) {
      addLog("error", "🍎 [API] data.response가 없습니다", data);
      const backendError = new Error("백엔드 로그인 실패: response가 없습니다");
      (backendError as any).stage = "backend_response";
      (backendError as any).responseData = data;
      throw backendError;
    }

    //note: [GET] user/me 호출로 최신 level과 nickname 가져오기 (auth.ts의 JWT callback과 동일한 로직)
    let loginResponseWithUserMe = data.response;
    try {
      addLog("info", "🍎 [API] user/me 호출 중...");
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

      // user/me의 최신 정보로 업데이트
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
    addLog("info", "🍎 [API] NextAuth 세션 생성 시작");
    const redirectUrl = new URL(`/home?success=true`, request.url);

    try {
      const nextResponse = await createNextAuthSessionWithCookie({
        loginResponse: loginResponseWithUserMe,
        provider: "APPLE",
        redirectUrl,
      });
      addLog("info", "🍎 [API] NextAuth 세션 생성 완료, 리다이렉트 응답 반환");

      // 성공 시에도 로그를 확인할 수 있도록 (쿼리 파라미터로 제어)
      const url = new URL(request.url);
      if (url.searchParams.get("debug") === "true") {
        // 디버그 모드에서는 로그를 포함한 JSON 응답 반환 (테스트용)
        return NextResponse.json({
          success: true,
          logs,
          message: "로그인 성공 (디버그 모드)",
        });
      }

      return nextResponse;
    } catch (sessionError) {
      addLog("error", "🍎 [API] NextAuth 세션 생성 실패", sessionError);
      const nextAuthError =
        sessionError instanceof Error ? sessionError : new Error(String(sessionError));
      (nextAuthError as any).stage = "nextauth_session";
      throw nextAuthError;
    }
  } catch (error) {
    addLog("error", "🍎 [API] Apple 로그인 처리 실패", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : undefined;
    const errorStage = (error as any)?.stage || "unknown";

    // 클라이언트에서 확인할 수 있도록 상세한 에러 정보 반환
    return NextResponse.json(
      {
        error: "Apple 로그인 실패",
        message: errorMessage,
        stage: errorStage, // 어느 단계에서 실패했는지 표시
        details: {
          name: errorName,
          message: errorMessage,
          // 스택 트레이스 포함 (프로덕션에서도 디버깅용)
          stack: shouldSendLogs ? errorStack : undefined,
          // 추가 에러 데이터 (예: 백엔드 응답 데이터)
          responseData: (error as any)?.responseData,
        },
        // 타임스탬프 추가 (에러 추적용)
        timestamp: new Date().toISOString(),
        // 서버 로그 포함 (프로덕션에서도 전달)
        ...(shouldSendLogs && { logs }),
      },
      { status: 500 },
    );
  }
}
