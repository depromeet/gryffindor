"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { FIRST_VISIT_SESSION_KEY } from "@/entities/honbob/ui/HonbobFirstVisitModal";
import { useSessionStorage } from "@/shared/lib";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { getSession } = useSessionStorage<boolean>(FIRST_VISIT_SESSION_KEY);
  const hasSeenModal = getSession();

  useEffect(() => {
    if (status === "loading") return; // 세션 로딩 중

    if (status === "authenticated" && session) {
      console.log("Auth callback session:", session);

      // 레벨에 따라 리다이렉트
      if (session.level === -1 && !hasSeenModal) {
        router.replace("/level-test");
      } else {
        router.replace("/");
      }
    } else if (status === "unauthenticated") {
      // 인증되지 않은 경우 로그인 페이지로
      router.replace("/login");
    }
  }, [session, status, router, hasSeenModal]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary500 border-t-transparent"></div>
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
}
