"use client";
// fixme: 일단은 클라이언트 컴포넌트 진행. 추후 수정 가능성 높음.

import { signInAction } from "@/features/auth/api/signInAction";

const oauthProviders = [
  { id: "google", label: "구글로 로그인" },
  { id: "kakao", label: "카카오로 로그인" },
];

export function SampleLogin() {
  return (
    <div>
      {oauthProviders.map((oauthProvider) => (
        <form
          key={oauthProvider.id}
          action={async () => {
            await signInAction(oauthProvider.id);
          }}
        >
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">
            {oauthProvider.label}
          </button>
        </form>
      ))}
    </div>
  );
}
