import { HonbobLevelCarousel, HonbobLevelTestGuideModal } from "@/entities/honbob";
import { StorePreviewList } from "@/entities/storeList/ui";
import { WelcomeUser } from "@/entities/user";
import { TransitionLayout } from "@/shared/ui";

export default async function HomePage() {
  return (
    <TransitionLayout>
      <div className="flex flex-col gap-[20px] bg-gray50 p-[20px]">
        <WelcomeUser />
        <HonbobLevelCarousel />
      </div>
      <StorePreviewList />
      <HonbobLevelTestGuideModal />
    </TransitionLayout>
  );
}
