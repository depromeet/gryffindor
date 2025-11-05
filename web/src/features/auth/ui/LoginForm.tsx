"use client";

import Image from "next/image";
import { useLoginApple, useLoginKakao } from "@/features/auth";
import { SOCIAL_LOGIN_CONFIG } from "@/features/auth/config/socialLoginConfig";
import { LoginCharacter } from "@/shared/lib/assets";
import { Icon } from "@/shared/ui";

export function LoginForm() {
  const { loginApple } = useLoginApple();
  const { loginKakao } = useLoginKakao();

  const handleSocialLogin = (providerId: string) => {
    console.log("🔵 LoginForm: handleSocialLogin called", { providerId, timestamp: Date.now() });
    try {
      // TODO: 임시 로직
      if (providerId === "apple") {
        console.log("🔵 LoginForm: Calling loginApple");
        loginApple();
      } else if (providerId === "kakao") {
        console.log("🔵 LoginForm: Calling loginKakao");
        loginKakao();
      } else {
        console.warn("🔵 LoginForm: Unknown providerId", providerId);
      }
    } catch (error) {
      console.error("🔴 LoginForm: Error in handleSocialLogin", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary500">
      <Icon name="bobEatText" className="h-[68px]" size={204} color="white" />
      <span className="body1-semibold mt-[35px] text-gray0">식당 찾기 스트레스 없이,</span>
      <span className="body1-semibold mb-[12px] text-gray0">혼밥을 더 자유롭고 편하게</span>
      <Image src={LoginCharacter} className="w-full" alt="login" width={375} height={340} />
      <div className="flex w-full items-center justify-center gap-5 px-6">
        {SOCIAL_LOGIN_CONFIG.map((config) => (
          <button
            key={config.id}
            type="button"
            onClick={() => {
              console.log("🔵 LoginForm: Button onClick triggered");
              handleSocialLogin(config.id);
            }}
            className={`flex items-center w-[60px] h-[60px] justify-center rounded-full font-medium transition-colors duration-200 ${config.buttonStyles}`}
          >
            <Image src={config.src} alt={`${config.label} 로고`} width={28} height={28} />
          </button>
        ))}
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
