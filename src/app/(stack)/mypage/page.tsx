"use client";

import Link from "next/link";
import { SampleAuthInfo } from "@/features/auth/ui";
import { Icon, TransitionLayout } from "@/shared/ui";

export default function MyPage() {
  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Icon name="user" size={64} className="text-purple-500 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">마이 페이지</h1>
          <p className="text-gray-600 mb-6">
            개인 정보와 설정을 관리하는 페이지입니다.
            <br />
            프로필을 확인하고 설정을 변경해보세요.
          </p>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">프로필 정보</h3>
              <p className="text-purple-600 text-sm">사용자명: 홍길동</p>
              <p className="text-purple-600 text-sm">이메일: user@example.com</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <h3 className="font-semibold text-pink-800 mb-2">계정 설정</h3>
              <p className="text-pink-600 text-sm">알림 설정, 개인정보 보호</p>
            </div>
            <Link href="/item">
              <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
                Item 페이지로 이동
              </div>
            </Link>
            <Link href="/mypage/tester">
              <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
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
