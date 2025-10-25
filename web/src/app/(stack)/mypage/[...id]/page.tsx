"use client";

import { use } from "react";
import { TransitionLayout } from "@/shared/ui";

export default function MyPage(props: PageProps<"/mypage/[...id]">) {
  const { params } = props;
  const resolvedParams = use(params);

  return (
    <TransitionLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          {resolvedParams.id.join("/")}
        </div>
      </div>
    </TransitionLayout>
  );
}
