import { Icon, TransitionLayout } from "@/shared/ui";

export default function MapPage() {
  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Icon name="map" size={64} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">지도 페이지</h1>
          <p className="text-gray-600 mb-6">
            여기는 지도 페이지입니다.
            <br />
            위치 정보와 지도를 표시하는 곳이에요.
          </p>
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">현재 위치</h3>
              <p className="text-red-600 text-sm">서울특별시 강남구</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">주변 장소</h3>
              <div className="text-orange-600 text-sm space-y-1">
                <div>• 카페 5곳</div>
                <div>• 음식점 12곳</div>
                <div>• 편의점 3곳</div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">거리</h3>
              <p className="text-yellow-600 text-sm">반경 500m 내 검색 결과</p>
            </div>
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
}
