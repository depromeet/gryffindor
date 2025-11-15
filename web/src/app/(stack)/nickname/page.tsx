"use client";

import { UserNicknameModifySection } from "@/features/user/ui";
import { TransitionLayout } from "@/shared/ui";

export default function NicknamePage() {
  return (
    <TransitionLayout>
      <UserNicknameModifySection />
    </TransitionLayout>
  );
}
