"use client";

import Image from "next/image";
import { signInAction } from "@/features/auth/api/signInAction";
import { LoginCharacter } from "@/shared/lib/assets";
import { SOCIAL_LOGIN_CONFIG } from "@/features/auth/config/socialLoginConfig";
import { Icon } from "@/shared/ui";

export function LoginForm() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary500">
      <Icon
        name="bobEatText"
        className="h-[83.89px]"
        size={160}
        color="white"
      />
      <span className="body1-semibold mt-[35px] text-gray0">
        식당 찾기 스트레스 없이,
      </span>
      <span className="body1-semibold mb-[12px] text-gray0">
        혼밥을 더 자유롭고 편하게
      </span>
      <Image
        src={LoginCharacter}
        className="w-full"
        alt="login"
        width={375}
        height={340}
      />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-6">
        {SOCIAL_LOGIN_CONFIG.map((config) => (
          <form
            key={config.id}
            className="w-full"
            action={async () => {
              await signInAction(config.id);
            }}
          >
            <button
              type="submit"
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-6 py-4 font-medium transition-colors duration-200 ${config.buttonStyles}`}
            >
              <Image
                src={config.src}
                alt={`${config.label} 로고`}
                width={20}
                height={20}
              />

              {config.label}
            </button>
          </form>
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
