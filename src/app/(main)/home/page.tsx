import Link from "next/link";
import { Icon, TransitionLayout } from "@/shared/ui";

export default function HomePage() {
  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Icon name="home" size={64} className="text-blue-500 mx-auto mb-4" />
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <Link href="/mypage">
                <div>마이 페이지로 이동</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
}
