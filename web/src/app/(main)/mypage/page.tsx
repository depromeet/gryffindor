"use client";

import { HonbobLevelInfoCard } from "@/entities/honbob";
import { UserMenuList } from "@/entities/user";
import { AccountActionsSection, UserProfileSection } from "@/features/user/ui";
import { TransitionLayout } from "@/shared/ui";

export default function MyPage() {
  return (
    <TransitionLayout>
      <div className="flex flex-col bg-gray0 pt-[20px]">
        <div className="flex flex-1 flex-col gap-y-[24px] pb-[20px]">
          <UserProfileSection />
          <HonbobLevelInfoCard />
          <UserMenuList />
        </div>
        <AccountActionsSection />
      </div>
    </TransitionLayout>
  );
}
