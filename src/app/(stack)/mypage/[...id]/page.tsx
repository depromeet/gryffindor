"use client";

import { use } from "react";
import { TransitionLayout } from "@/shared/ui";

export default function MyPage(props: PageProps<"/mypage/[...id]">) {
  const { params } = props;
  const resolvedParams = use(params);

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          {resolvedParams.id.join("/")}
        </div>
      </div>
    </TransitionLayout>
  );
}
