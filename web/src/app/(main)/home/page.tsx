import Link from "next/link";
import { HonbobFirstVisitModal, HonbobLevelTestGuideModal } from "@/entities/honbob";
import { StoreList } from "@/entities/storeList/ui";
import { WelcomeUser } from "@/entities/user";
import { InputShapeCard, RECOMMEND_LIST } from "@/features/search";
import { TransitionLayout } from "@/shared/ui";

export default async function HomePage() {
  return (
    <TransitionLayout>
      <div className="flex flex-col  bg-gray50 px-[20px] pb-[20px] rounded-b-[20px]">
        <WelcomeUser />
        <Link href={RECOMMEND_LIST.href}>
          <InputShapeCard />
        </Link>
      </div>
      <StoreList />
      <HonbobLevelTestGuideModal />
      <HonbobFirstVisitModal />
    </TransitionLayout>
  );
}
