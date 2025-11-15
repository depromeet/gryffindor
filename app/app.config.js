// Expo 환경변수 설정
// .env 파일이나 환경변수에서 읽어옵니다
require("dotenv").config();

module.exports = {
  expo: {
    name: "밥토리",
    slug: "bobtory-app",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/images/app-logo.png",
    scheme: "bobtoryapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.bobtory",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        // iOS 9.0+ 에서 외부 앱(카카오톡 등)을 열기 위한 URL 스킴 등록
        // 이 스킴들이 등록되지 않으면 Linking.canOpenURL()이 false를 반환함
        LSApplicationQueriesSchemes: [
          "kakaokompassauth", // 카카오 로그인 인증용
          "kakaolink", // 카카오톡 링크
          "kakaotalk", // 카카오톡 앱
          "navermaps", // 네이버 지도
          "nmap", // 네이버 지도
        ],
        NSLocationWhenInUseUsageDescription: "당신의 위치 정보를 사용하여 주변 맛집을 추천하고, 근처 식사 기록을 분석해 더 나은 식사 경험을 제공합니다."
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.ico",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-apple-authentication", // Apple 로그인 플러그인 추가
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "f4aa58ed-408c-41ca-bc64-f85f3e591732",
      },
      // 환경변수를 extra 필드에 추가하여 Constants.expoConfig.extra로 접근 가능
      KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID || "",
      KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI || "",
    },
  },
};
