"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserState } from "@/entities/user";
import { signInAction } from "@/features/auth/api/signInAction";
import { GoogleLogo, KakaoLogo, LoginCharacter } from "@/shared/lib/assets";
import { Icon, TextButton } from "@/shared/ui";

const oauthProviders = [
  { id: "google", label: "구글로 로그인" },
  { id: "kakao", label: "카카오로 로그인" },
];

export function LoginForm() {
  const router = useRouter();
  const { userState } = useUserState();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary500">
      <Icon name="bobEatText" className="h-[83.89px]" size={160} color="white" />
      <span className="body1-semibold mt-[35px] text-gray0">식당 찾기 스트레스 없이,</span>
      <span className="body1-semibold mb-[12px] text-gray0">혼밥을 더 자유롭고 편하게</span>
      <Image src={LoginCharacter} className="w-full" alt="login" width={375} height={340} />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-6">
        {oauthProviders.map((oauthProvider) => {
          const isGoogle = oauthProvider.id === "google";
          const buttonStyles = isGoogle
            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
                <Image
                  src={isGoogle ? GoogleLogo : KakaoLogo}
                  alt={`${oauthProvider.label} 로고`}
                  width={20}
                  height={20}
                />
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
