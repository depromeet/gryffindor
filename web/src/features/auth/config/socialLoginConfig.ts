import type { StaticImageData } from "next/image";
import { GoogleLogo, KakaoLogo } from "@/shared/lib/assets";

/**
 * 사용 가능한 소셜 로그인 프로바이더 타입 정의
 */
export type SocialLoginProvider = "google" | "kakao" | "apple";

/**
 * 소셜 로그인 설정 인터페이스 정의
 */
export interface SocialLoginConfig {
  id: SocialLoginProvider;
  label: string;
  src: StaticImageData;
  buttonStyles: string;
}

/**
 * 각 Provider별 설정 데이터 정의
 */
const providerConfigs: Record<SocialLoginProvider, Omit<SocialLoginConfig, "id">> = {
  google: {
    label: "구글로 로그인",
    src: GoogleLogo,
    buttonStyles: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  },
  kakao: {
    label: "카카오로 로그인",
    src: KakaoLogo,
    buttonStyles: "bg-[#FEE500] text-gray-900 hover:bg-[#FFEB3B]",
  },
  apple: {
    label: "애플로 로그인",
    src: KakaoLogo, // TODO: Apple 로고 추가 필요
    buttonStyles: "bg-black text-white hover:bg-gray-800",
  },
};

/**
 * 활성화된 소셜 로그인 프로바이더 목록 정의
 * 장애, 미사용 요소는 해당 배열에서 제외
 */
const ENABLED_PROVIDERS: readonly SocialLoginProvider[] = ["google", "kakao", "apple"];

/**
 * 동적으로 활성화된 provider만 생성하는 함수
 */
export function getSocialLoginConfigs(): SocialLoginConfig[] {
  return ENABLED_PROVIDERS.map((provider) => ({
    id: provider,
    ...providerConfigs[provider],
  }));
}

/**
 * 최종 소셜 로그인 설정 목록 정의
 * 활성화된 provider만 생성된 설정 목록을 반환
 */
export const SOCIAL_LOGIN_CONFIG = getSocialLoginConfigs();
