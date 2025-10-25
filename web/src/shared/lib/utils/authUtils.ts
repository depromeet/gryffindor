// 토큰 갱신 여유 시간 상수
export const TOKEN_REFRESH_MARGIN = 5 * 60; // 5분

export function isTokenExpired(expiresAt: string | number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const expireTime =
    typeof expiresAt === "string" ? Math.floor(new Date(expiresAt).getTime() / 1000) : expiresAt;
  return now >= expireTime;
}
