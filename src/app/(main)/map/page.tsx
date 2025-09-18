import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHandler,
  BottomSheetHeader,
  Icon,
  TransitionLayout,
} from "@/shared/ui";

export default function MapPage() {
  return (
    <TransitionLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6">
            <Icon name="map" size={64} />
          </div>
          <h1 className="mb-4 font-bold text-3xl text-gray-800">지도 페이지</h1>
          <p className="mb-6 text-gray-600">
            여기는 지도 페이지입니다.
            <br />
            위치 정보와 지도를 표시하는 곳이에요.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-800">현재 위치</h3>
              <p className="text-red-600 text-sm">서울특별시 강남구</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4">
              <h3 className="mb-2 font-semibold text-orange-800">주변 장소</h3>
              <div className="space-y-1 text-orange-600 text-sm">
                <div>• 카페 5곳</div>
                <div>• 음식점 12곳</div>
                <div>• 편의점 3곳</div>
              </div>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <h3 className="mb-2 font-semibold text-yellow-800">거리</h3>
              <p className="text-sm text-yellow-600">반경 500m 내 검색 결과</p>
            </div>
          </div>
        </div>
      </div>

      <BottomSheet isOpen={true} initialHeight={226} expandedOffset={88}>
        <BottomSheetHeader>
          <BottomSheetHandler />
        </BottomSheetHeader>
        <BottomSheetContent className="gap-[15px]">{/* store list */}</BottomSheetContent>
      </BottomSheet>
    </TransitionLayout>
  );
}
