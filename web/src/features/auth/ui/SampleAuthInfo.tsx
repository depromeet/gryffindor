"use client";
// fixme: 일단은 클라이언트 컴포넌트 진행. 추후 수정 가능성 높음.

import { useSession } from "next-auth/react";
import { signOutAction } from "@/features/auth/api/signOutAction";

export function SampleAuthInfo() {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <div>
      <h1>환영합니다~ {userName}님</h1>
      <span>이름: {userName}</span>
      {session && (
        <form
          action={async () => {
            await signOutAction();
          }}
        >
          <button type="submit" className="cursor-pointer rounded-md bg-blue-500 p-2 text-white">
            로그아웃
          </button>
        </form>
      )}
    </div>
  );
}
