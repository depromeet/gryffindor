"use client";

import Image from "next/image";
import { signInAction } from "@/features/auth/api/signInAction";
import { GoogleLogo, KakaoLogo, LoginCharacter } from "@/shared/lib/assets";
import { Icon } from "@/shared/ui";

const oauthProviders = [
  { id: "google", label: "구글로 로그인" },
  { id: "kakao", label: "카카오로 로그인" },
  { id: "apple", label: "애플로 로그인" },
];

//todo: 컴포넌트 수정 예정. 현재 apple 로그인 테스트를 위한 배포
export function LoginForm() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary500">
      <Icon name="bobEatText" className="h-[83.89px]" size={160} color="white" />
      <span className="body1-semibold mt-[35px] text-gray0">식당 찾기 스트레스 없이,</span>
      <span className="body1-semibold mb-[12px] text-gray0">혼밥을 더 자유롭고 편하게</span>
      <Image src={LoginCharacter} className="w-full" alt="login" width={375} height={340} />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-6">
        {oauthProviders.map((oauthProvider) => {
          const isGoogle = oauthProvider.id === "google";
          const isApple = oauthProvider.id === "apple";
          const buttonStyles = isGoogle
            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            : isApple
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-[#FEE500] text-gray-900 hover:bg-[#FFEB3B]";

          return (
            <form
              key={oauthProvider.id}
              className="w-full"
              action={async () => {
                await signInAction(oauthProvider.id);
              }}
            >
              <button
                type="submit"
                className={`flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 font-medium transition-colors duration-200 ${buttonStyles}
                `}
              >
                {!isApple && (
                  <Image
                    src={isGoogle ? GoogleLogo : KakaoLogo}
                    alt={`${oauthProvider.label} 로고`}
                    width={20}
                    height={20}
                  />
                )}
                {isApple && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                    role="img"
                    aria-label="Apple 로고"
                  >
                    <title>Apple 로고</title>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
                {oauthProvider.label}
              </button>
            </form>
          );
        })}
        {/* <TextButton
          label="로그인 없이 둘러보기"
          onClick={() => router.replace("/home")}
          isUnderline
          isIcon={false}
        /> */}
      </div>
    </div>
  );
}
