import { TransitionLayout } from "@/shared/ui";

export default function TesterPage() {
  return (
    <TransitionLayout>
      <div className="space-y-6 p-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-gray-800 text-xl">테스터 페이지</h2>
          <p className="mb-4 text-gray-600">
            이 페이지는 스택 네비게이션 테스트용 페이지입니다. 상단에 공통 헤더가 표시되어야 합니다.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-800">헤더 테스트</h3>
          <p className="text-blue-600 text-sm">• 뒤로가기 버튼이 작동하는지 확인</p>
          <p className="text-blue-600 text-sm">• 제목이 "테스터 페이지"로 표시되는지 확인</p>
          <p className="text-blue-600 text-sm">• 모바일에서만 헤더가 표시되는지 확인</p>
        </div>

        <div className="rounded-lg bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-800">드릴 애니메이션</h3>
          <p className="text-green-600 text-sm">
            이 페이지로 진입할 때 drill 애니메이션이 적용되어야 합니다.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
            <span className="text-gray-500">테스트 콘텐츠 영역 1</span>
          </div>
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
            <span className="text-gray-500">테스트 콘텐츠 영역 2</span>
          </div>
          <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
            <span className="text-gray-500">테스트 콘텐츠 영역 3</span>
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
}
