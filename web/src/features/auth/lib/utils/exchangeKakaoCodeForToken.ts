/**
 * 카카오 인증 코드를 액세스 토큰으로 교환
 * 카카오 공식 문서: https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
 */
export async function exchangeKakaoCodeForToken(
  code: string,
  redirectUri?: string,
): Promise<string> {
  const tokenUrl = "https://kauth.kakao.com/oauth/token";
  const finalRedirectUri: string =
    redirectUri || process.env.KAKAO_REDIRECT_URI || "http://localhost:3000/api/kakao/callback";

  // 카카오 공식 문서에 따른 파라미터 구성
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID || "",
    client_secret: process.env.KAKAO_CLIENT_SECRET || "",
    redirect_uri: finalRedirectUri,
    code,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`토큰 교환 실패 (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
    refresh_token_expires_in?: number;
  };

  return data.access_token;
}
