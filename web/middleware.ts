import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { AUTH_CONFIG } from "@/shared/config/routeConfig";

const { PROTECTED_ROUTES, AUTH_ROUTES } = AUTH_CONFIG;

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.accessToken;

  console.log("🔍 [Middleware] 디버깅", {
    path: nextUrl.pathname,
    hasAuth: !!req.auth,
    hasAccessToken: !!req.auth?.accessToken,
    accessToken: req.auth?.accessToken ? `${req.auth.accessToken.substring(0, 20)}...` : null,
    isLoggedIn,
  });

  // 경로 확인 함수들
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => nextUrl.pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => nextUrl.pathname.startsWith(route));

  // 1. 인증된 사용자가 auth 경로에 접근하려는 경우 -> 홈으로 리다이렉트
  if (isLoggedIn && isAuthRoute) {
    console.log("🚫 [Middleware] 로그인된 사용자가 auth 페이지 접근 차단 -> /home 리다이렉트");
    return NextResponse.redirect(new URL("/home", nextUrl));
  }

  // 2. 인증되지 않은 사용자가 보호된 경로에 접근하려는 경우 -> 로그인으로 리다이렉트
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. 세션 에러가 있는 경우 로그인으로 리다이렉트
  if (req.auth?.error && isProtectedRoute) {
    console.error("Session error detected:", req.auth.error);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 4. 그 외의 경우는 그대로 진행
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 경로에서 미들웨어 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 기타 정적 파일들 (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
