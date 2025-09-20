import { Button } from "@/shared/ui";

interface LevelTestResultProps {
  result: {
    level: number;
    categories: Record<string, number>;
    recommendations: string[];
  };
  onRestart: () => void;
}

const LEVEL_DESCRIPTIONS = {
  1: {
    title: "혼밥 입문자",
    subtitle: "첫 걸음을 내딛는 중",
    description:
      "혼밥이 아직 낯설지만 천천히 시작해보세요. 편안한 곳부터 도전해보는 것이 좋습니다.",
    color: "bg-blue-500",
  },
  2: {
    title: "혼밥 초급자",
    subtitle: "조심스럽게 도전하는 중",
    description: "혼밥에 조금씩 익숙해지고 있어요. 1인석이 있는 곳을 중심으로 범위를 넓혀보세요.",
    color: "bg-green-500",
  },
  3: {
    title: "혼밥 중급자",
    subtitle: "자신감을 가지고 도전",
    description: "혼밥에 어느 정도 익숙해졌어요. 다양한 메뉴와 분위기의 식당을 도전해보세요.",
    color: "bg-yellow-500",
  },
  4: {
    title: "혼밥 고급자",
    subtitle: "자유자재로 혼밥 즐기기",
    description:
      "혼밥에 상당히 익숙해요. 2인 메뉴도 혼자 주문할 수 있고 대부분의 식당을 편하게 이용합니다.",
    color: "bg-orange-500",
  },
  5: {
    title: "혼밥 마스터",
    subtitle: "혼밥의 달인",
    description:
      "혼밥에 완전히 익숙해져서 어떤 식당이든 자유자재로 이용할 수 있어요. 새로운 도전을 즐겨보세요!",
    color: "bg-red-500",
  },
};

export function LevelTestResult({ result, onRestart }: LevelTestResultProps) {
  const levelInfo = LEVEL_DESCRIPTIONS[result.level as keyof typeof LEVEL_DESCRIPTIONS];

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-2xl text-gray-900">테스트 완료!</h1>
        <p className="text-gray-600">당신의 혼밥 레벨을 확인해보세요</p>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <div
            className={`h-20 w-20 ${levelInfo.color} mx-auto mb-4 flex items-center justify-center rounded-full`}
          >
            <span className="font-bold text-2xl text-white">Lv.{result.level}</span>
          </div>
          <h2 className="mb-1 font-bold text-gray-900 text-xl">{levelInfo.title}</h2>
          <p className="mb-4 text-gray-500 text-sm">{levelInfo.subtitle}</p>
          <p className="text-gray-700 leading-relaxed">{levelInfo.description}</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900">추천 맛집 유형</h3>
        <div className="space-y-2">
          {result.recommendations.map((recommendation) => (
            <div key={recommendation} className="flex items-start">
              <span className="mr-2 text-red-500">•</span>
              <span className="text-gray-700 text-sm">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Button
          label="맞춤 맛집 찾아보기"
          onClick={() => {
            // 홈으로 이동하거나 맛집 목록으로 이동
            window.location.href = "/home";
          }}
          fullWidth
          size="large"
        />
        <Button label="다시 테스트하기" onClick={onRestart} variant="secondary" fullWidth />
      </div>
    </div>
  );
}
