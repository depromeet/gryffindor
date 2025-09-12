import { TransitionLayout } from "@/shared/ui";

export default function TesterPage() {
  return (
    <TransitionLayout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">테스터 페이지</h2>
          <p className="text-gray-600 mb-4">
            이 페이지는 스택 네비게이션 테스트용 페이지입니다. 상단에 공통 헤더가 표시되어야 합니다.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">헤더 테스트</h3>
          <p className="text-blue-600 text-sm">• 뒤로가기 버튼이 작동하는지 확인</p>
          <p className="text-blue-600 text-sm">• 제목이 "테스터 페이지"로 표시되는지 확인</p>
          <p className="text-blue-600 text-sm">• 모바일에서만 헤더가 표시되는지 확인</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">드릴 애니메이션</h3>
          <p className="text-green-600 text-sm">
            이 페이지로 진입할 때 drill 애니메이션이 적용되어야 합니다.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">테스트 콘텐츠 영역 1</span>
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">테스트 콘텐츠 영역 2</span>
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">테스트 콘텐츠 영역 3</span>
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
}
