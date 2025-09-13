"use client";

import Link from "next/link";
import { SampleAuthInfo } from "@/features/auth/ui";
import { Icon, TransitionLayout } from "@/shared/ui";

export default function MyPage() {
  return (
    <TransitionLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6">
            <Icon name="user" size={64} className="mx-auto mb-4 text-purple-500" />
          </div>
          <h1 className="mb-4 font-bold text-3xl text-gray-800">마이 페이지</h1>
          <p className="mb-6 text-gray-600">
            개인 정보와 설정을 관리하는 페이지입니다.
            <br />
            프로필을 확인하고 설정을 변경해보세요.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-800">프로필 정보</h3>
              <p className="text-purple-600 text-sm">사용자명: 홍길동</p>
              <p className="text-purple-600 text-sm">이메일: user@example.com</p>
            </div>
            <div className="rounded-lg bg-pink-50 p-4">
              <h3 className="mb-2 font-semibold text-pink-800">계정 설정</h3>
              <p className="text-pink-600 text-sm">알림 설정, 개인정보 보호</p>
            </div>
            <Link href="/item">
              <div className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600">
                Item 페이지로 이동
              </div>
            </Link>
            <Link href="/mypage/tester">
              <div className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600">
                다음 스택으로 이동
              </div>
            </Link>
            <SampleAuthInfo />
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
}
