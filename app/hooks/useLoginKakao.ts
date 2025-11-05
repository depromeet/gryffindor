import type { BridgeMessage, BridgeQuery } from "@bridge";
import Constants from "expo-constants";
import { Linking, Platform } from "react-native";

const clientId = Constants.expoConfig?.extra?.KAKAO_CLIENT_ID;
const redirectUri = Constants.expoConfig?.extra?.KAKAO_REDIRECT_URI;

export const useLoginKakao = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void,
) => {
  const loginKakao = async () => {
    console.log("💬 [Native] useLoginKakao: loginKakao called");
    console.log("💬 [Native] useLoginKakao: Environment variables check", {
      hasClientId: !!clientId,
      clientIdLength: clientId?.length || 0,
      hasRedirectUri: !!redirectUri,
      redirectUri: redirectUri || "NOT_SET",
      extraConfig: Constants.expoConfig?.extra
        ? Object.keys(Constants.expoConfig.extra)
        : "NO_EXTRA",
    });

    // 환경변수 검증
    if (!clientId || clientId === "") {
      console.error("❌ [Native] useLoginKakao: KAKAO_CLIENT_ID is missing or empty!");
      onResponse({
        loginKakao: {
          url: "",
          success: false,
        },
      });
      return;
    }

    if (!redirectUri || redirectUri === "") {
      console.error("❌ [Native] useLoginKakao: KAKAO_REDIRECT_URI is missing or empty!");
      onResponse({
        loginKakao: {
          url: "",
          success: false,
        },
      });
      return;
    }

    try {
      // 카카오 로그인 URL 생성
      const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
      console.log("💬 [Native] useLoginKakao: Generated Kakao login URL", {
        urlLength: kakaoLoginUrl.length,
        hasClientId: kakaoLoginUrl.includes("client_id="),
        hasRedirectUri: kakaoLoginUrl.includes("redirect_uri="),
      });

      // iOS에서 카카오톡 앱이 설치되어 있는지 확인
      if (Platform.OS === "ios") {
        console.log("💬 [Native] useLoginKakao: Checking if KakaoTalk app is installed");
        const canOpenKakaoTalk = await Linking.canOpenURL("kakaolink://");
        console.log("💬 [Native] useLoginKakao: canOpenKakaoTalk =", canOpenKakaoTalk);

        if (canOpenKakaoTalk) {
          // 카카오톡 앱으로 로그인 시도
          // 카카오톡 앱에서 인증 후 redirect_uri로 리다이렉트되면 WebView로 돌아옴
          const kakaoLinkUrl = `kakaolink://oauth?url=${encodeURIComponent(kakaoLoginUrl)}`;
          console.log("💬 [Native] useLoginKakao: Opening KakaoTalk app", {
            kakaoLinkUrlLength: kakaoLinkUrl.length,
          });
          await Linking.openURL(kakaoLinkUrl);

          // 앱으로 열었으므로 응답은 즉시 전송하지 않음
          // 카카오톡 앱에서 인증 후 redirect_uri로 리다이렉트됨
          console.log("💬 [Native] useLoginKakao: Sending response (KakaoTalk app opened)");
          onResponse({
            loginKakao: {
              url: "", // 앱으로 열었으므로 URL 불필요 (빈 문자열로 구분)
              success: true,
            },
          });
          return;
        }
      }

      console.log("💬 [Native] useLoginKakao: Sending response (WebView URL)");
      onResponse({
        loginKakao: {
          url: kakaoLoginUrl, // WebView에서 열 URL
          success: true,
        },
      });
    } catch (error) {
      console.error("❌ [Native] useLoginKakao: Error occurred", error);
      console.error("❌ [Native] useLoginKakao: Error details", {
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
      });

      // 에러 응답
      onResponse({
        loginKakao: {
          url: "",
          success: false,
        },
      });
    }
  };

  return {
    loginKakao,
  };
};
