/**
 * NextAuth 세션 생성 유틸리티
 * Native 로그인 후 백엔드 응답을 NextAuth 세션으로 변환
 */

import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import type { LoginResponse } from "@/auth";

// ============================================
// 상수 정의
// ============================================

const SESSION_COOKIE_NAME = "authjs.session-token";
const SECURE_SESSION_COOKIE_NAME = "__Secure-authjs.session-token";
const SESSION_SALT = "authjs.session-token";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30일

// ============================================
// 타입 정의
// ============================================

interface CreateSessionParams {
  loginResponse: LoginResponse;
  provider: "KAKAO" | "APPLE";
}

interface CreateSessionWithCookieParams extends CreateSessionParams {
  redirectUrl: URL;
}

// ============================================
// 내부 유틸리티 함수
// ============================================

/**
 * LoginResponse를 NextAuth JWT 토큰 구조로 변환
 */
function buildTokenPayload(loginResponse: LoginResponse, provider: "KAKAO" | "APPLE") {
  return {
    accessToken: loginResponse.accessToken,
    refreshToken: loginResponse.refreshToken,
    accessTokenExpiration: loginResponse.accessTokenExpiration,
    refreshTokenExpiration: loginResponse.refreshTokenExpiration,
    memberId: loginResponse.memberId,
    nickName: loginResponse.nickName,
    level: loginResponse.level,
    providerType: provider,
    email: loginResponse.email,
    profileImage: loginResponse.profileImage,
    memberRole: loginResponse.memberRole,
  };
}

/**
 * 환경 변수에서 AUTH_SECRET 가져오기
 */
function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET 또는 NEXTAUTH_SECRET 환경 변수가 설정되지 않았습니다.");
  }

  return secret;
}

/**
 * 환경에 따른 쿠키 이름 결정
 */
function getCookieName(): string {
  return process.env.NODE_ENV === "production" ? SECURE_SESSION_COOKIE_NAME : SESSION_COOKIE_NAME;
}

/**
 * 백엔드 로그인 응답을 NextAuth JWT 토큰(암호화된 문자열)으로 변환
 * @internal 내부 함수, 직접 호출하지 마세요
 */
async function createNextAuthToken(params: CreateSessionParams): Promise<string> {
  const { loginResponse, provider } = params;

  const token = buildTokenPayload(loginResponse, provider);
  const secret = getAuthSecret();

  const encodedToken = await encode({
    token,
    secret,
    salt: SESSION_SALT,
    maxAge: SESSION_MAX_AGE,
  });

  return encodedToken;
}

// ============================================
// Public API
// ============================================

/**
 * NextAuth 세션 생성 및 쿠키 설정을 한 번에 처리
 *
 * @param params - 세션 생성 파라미터
 * @returns 쿠키가 설정된 리다이렉트 응답
 *
 * @example
 * ```ts
 * const redirectUrl = new URL("/home?success=true", request.url);
 * const response = await createNextAuthSessionWithCookie({
 *   loginResponse: backendResponse,
 *   provider: "KAKAO",
 *   redirectUrl,
 * });
 * ```
 */
export async function createNextAuthSessionWithCookie(
  params: CreateSessionWithCookieParams,
): Promise<NextResponse> {
  const { loginResponse, provider, redirectUrl } = params;

  // JWT 토큰 생성
  const jwtToken = await createNextAuthToken({ loginResponse, provider });

  // 쿠키 이름 결정
  const cookieName = getCookieName();

  // 리다이렉트 응답 생성
  const nextResponse = NextResponse.redirect(redirectUrl);

  // 쿠키 설정
  nextResponse.cookies.set(cookieName, jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return nextResponse;
}
