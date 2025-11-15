"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLoginApple, useLoginKakao } from "@/features/auth";
import { SOCIAL_LOGIN_CONFIG } from "@/features/auth/config/socialLoginConfig";
import { CUSTOM_EVENTS, useGAClick } from "@/shared/lib";
import { LoginCharacter } from "@/shared/lib/assets";
import { Icon, TextButton } from "@/shared/ui";

export function LoginForm() {
  const { loginApple } = useLoginApple();
  const { loginKakao } = useLoginKakao();
  const searchParams = useSearchParams();
  const router = useRouter();

  const trackKakaoButton = useGAClick(CUSTOM_EVENTS.BUTTON_CLICK, {
    button_id: "login_form_kakao",
    button_text: "카카오 로그인",
    location: "login_form",
  });

  const trackAppleButton = useGAClick(CUSTOM_EVENTS.BUTTON_CLICK, {
    button_id: "login_form_apple",
    button_text: "애플 로그인",
    location: "login_form",
  });

  const trackNoLoginButton = useGAClick(CUSTOM_EVENTS.BUTTON_CLICK, {
    button_id: "login_form_no_login",
    button_text: "로그인 없이 둘러보기",
    location: "login_form",
  });

  // URL 파라미터에서 에러와 로그 확인 (카카오 로그인 실패 시)
  useEffect(() => {
    const error = searchParams.get("error");
    const errorMessage = searchParams.get("error_message");
    const logsParam = searchParams.get("logs");

    if (error || logsParam) {
      console.group("🔴 로그인 에러 발생");

      if (error) {
        console.error("에러 코드:", error);
      }

      if (errorMessage) {
        console.error("에러 메시지:", decodeURIComponent(errorMessage));
      }

      // 서버 로그가 있으면 파싱하여 출력
      if (logsParam) {
        try {
          const logs = JSON.parse(decodeURIComponent(logsParam));
          console.log("📋 서버 로그 (시간순):");
          logs.forEach((log: any, index: number) => {
            const logMethod =
              log.level === "error"
                ? console.error
                : log.level === "warn"
                  ? console.warn
                  : console.log;
            logMethod(`[${index + 1}] [${log.timestamp}] [${log.level}] ${log.message}`, log.data);
          });

          // 개발 모드에서 클립보드에 복사
          if (
            process.env.NODE_ENV === "development" &&
            typeof navigator !== "undefined" &&
            navigator.clipboard
          ) {
            navigator.clipboard
              .writeText(JSON.stringify(logs, null, 2))
              .then(() => {
                console.log("📋 서버 로그가 클립보드에 복사되었습니다.");
              })
              .catch(() => {
                console.warn("📋 클립보드 복사 실패");
              });
          }
        } catch (parseError) {
          console.error("로그 파싱 실패:", parseError);
        }
      }

      console.groupEnd();

      // 프로덕션에서도 alert 표시 (디버깅용)
      const message = errorMessage ? decodeURIComponent(errorMessage) : error || "알 수 없는 에러";
      alert(`로그인 실패: ${message}\n\n콘솔에서 서버 로그를 확인하세요.`);
    }
  }, [searchParams]);

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
      <Image src={LoginCharacter} alt="login" width={375} height={340} />
      <div className="flex flex-col w-full items-center justify-center gap-y-[45px]">
        <div className="flex  w-full items-center justify-center gap-5 px-6">
          {SOCIAL_LOGIN_CONFIG.map((config) => (
            <button
              key={config.id}
              type="button"
              onClick={() => {
                // GA 이벤트 먼저 전송
                if (config.id === "kakao") {
                  trackKakaoButton();
                } else if (config.id === "apple") {
                  trackAppleButton();
                }

                // GA 이벤트가 전송될 시간을 주고 로그인 실행
                setTimeout(() => {
                  handleSocialLogin(config.id);
                }, 100);
              }}
              className={`flex items-center w-[60px] h-[60px] justify-center rounded-full font-medium transition-colors duration-200 ${config.buttonStyles}`}
            >
              <Image src={config.src} alt={`${config.label} 로고`} width={28} height={28} />
            </button>
          ))}
        </div>
        <div className="text-body2-medium text-white">
          <TextButton
            label="로그인 없이 둘러보기"
            color="white"
            onClick={() => {
              trackNoLoginButton();
              router.push("/home");
            }}
            isUnderline
            isIcon={false}
          />
        </div>
      </div>
    </div>
  );
}
