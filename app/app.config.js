
// Expo 환경변수 설정
// .env 파일이나 환경변수에서 읽어옵니다
require("dotenv").config();

module.exports = {
  expo: {
    name: "bobtory-app",
    slug: "bobtory-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "bobtoryapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bobtory",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
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
      favicon: "./assets/images/favicon.png",
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
