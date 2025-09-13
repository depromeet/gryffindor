import { auth } from "@/auth";
import { HonbobLevelCard } from "@/entities/honbob";
import { StoreList } from "@/entities/storeList";
import { WelcomeUser } from "@/entities/user";
import { TransitionLayout } from "@/shared/ui";

export default async function HomePage() {
  const session = await auth();
  const userName = session?.user?.name || "이잉~";

  const honbobLevelCard = {
    honbobLevel: "Lv.1",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "혼자 먹기 좋은 식당부터 보여드려요",
    // honbobLevelIcon: "",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  };

  return (
    <TransitionLayout>
      <div className="flex flex-col gap-[20px] bg-gray50 p-[20px]">
        <WelcomeUser userName={userName} />
        <HonbobLevelCard {...honbobLevelCard} />
        {/* todo: 혼밥 레벨 카드 캐러셀 추가 */}
      </div>
      <StoreList />
    </TransitionLayout>
  );
}
