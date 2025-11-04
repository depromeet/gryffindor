import type { BridgeMessage, BridgeQuery } from "@bridge";
import Constants from "expo-constants";
import { Linking, Platform } from "react-native";

const clientId = Constants.expoConfig?.extra?.KAKAO_CLIENT_ID;
const redirectUri = Constants.expoConfig?.extra?.KAKAO_REDIRECT_URI;

export const useLoginKakao = (
  onResponse: <T extends BridgeQuery>(result: BridgeMessage<T>) => void,
) => {
  const loginKakao = async () => {
    try {
      // 카카오 로그인 URL 생성
      const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri || "")}&response_type=code`;

      // iOS에서 카카오톡 앱이 설치되어 있는지 확인
      if (Platform.OS === "ios") {
        const canOpenKakaoTalk = await Linking.canOpenURL("kakaolink://");

        if (canOpenKakaoTalk) {
          // 카카오톡 앱으로 로그인 시도
          // 카카오톡 앱에서 인증 후 redirect_uri로 리다이렉트되면 WebView로 돌아옴
          const kakaoLinkUrl = `kakaolink://oauth?url=${encodeURIComponent(kakaoLoginUrl)}`;
          await Linking.openURL(kakaoLinkUrl);

          // 앱으로 열었으므로 응답은 즉시 전송하지 않음
          // 카카오톡 앱에서 인증 후 redirect_uri로 리다이렉트됨
          onResponse({
            loginKakao: {
              url: "", // 앱으로 열었으므로 URL 불필요 (빈 문자열로 구분)
              success: true,
            },
          });
          return;
        }
      }

      onResponse({
        loginKakao: {
          url: kakaoLoginUrl, // WebView에서 열 URL
          success: true,
        },
      });
    } catch (error) {
      console.error("카카오 로그인 에러:", error);

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
