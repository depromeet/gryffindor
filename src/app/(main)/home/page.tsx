"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SampleAuthStateInfo } from "@/features/auth/ui";
import { userApi } from "@/features/user/api/userApi";
import { queryKeys } from "@/shared/api";
import { TransitionLayout } from "@/shared/ui";

export default function HomePage() {
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";
  const userName = session?.data?.nickName || "새로운 이잉";

  const { data } = useQuery({
    queryKey: queryKeys.USER_PROFILE(),
    queryFn: () => userApi.getUserProfile(),
    enabled: isAuthenticated,
  });

  console.log("PROFILE data", data);

  return (
    <TransitionLayout>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <h1>웹컴투 그린핀도르</h1>
        <Link href="/onboarding">레벨테스트</Link>
        <SampleAuthStateInfo isAuthenticated={isAuthenticated} userName={userName} />
      </div>
    </TransitionLayout>
  );
}
