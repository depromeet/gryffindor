import { auth } from "@/auth";
import { HonbobLevelCarousel } from "@/entities/honbob";
import { StoreList } from "@/entities/storeList";
import { WelcomeUser } from "@/entities/user";
import { TransitionLayout } from "@/shared/ui";

export default async function HomePage() {
  const session = await auth();
  const userName = session?.user?.name || "이잉~";

  return (
    <TransitionLayout>
      <div className="flex flex-col gap-[20px] bg-gray50 p-[20px]">
        <WelcomeUser userName={userName} />
        <HonbobLevelCarousel />
      </div>
      <StoreList />
    </TransitionLayout>
  );
}
