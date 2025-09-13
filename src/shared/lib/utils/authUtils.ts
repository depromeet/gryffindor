import type { ApiResponse } from "../../model/types";

interface RefreshTokenResponse {
  userId: string;
  nickname: string;
  level: number;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  userId: string;
  nickname: string;
  level: number;
} | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/renew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      console.error("Token refresh failed:", response.status);
      return null;
    }

    const data = (await response.json()) as ApiResponse<RefreshTokenResponse>;

    if (!data.response) {
      console.error("Invalid refresh response:", data);
      return null;
    }

    const now = Math.floor(Date.now() / 1000);

    return {
      accessToken: data.response.accessToken,
      refreshToken: data.response.refreshToken,
      accessTokenExpiresAt: now + data.response.accessTokenExpiresIn,
      refreshTokenExpiresAt: now + data.response.refreshTokenExpiresIn,
      userId: data.response.userId,
      nickname: data.response.nickname,
      level: data.response.level,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}

export function isTokenExpired(expiresAt: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  // 5분 여유를 두고 토큰 갱신
  return now >= expiresAt - 300;
}
