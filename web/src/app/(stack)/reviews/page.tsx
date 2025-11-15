"use client";

import { MyReviewListSection } from "@/features/review/ui/MyReviewListSection";
import { TransitionLayout } from "@/shared/ui";

export default function MyReviewsPage() {
  return (
    <TransitionLayout>
      <div className="flex flex-col h-full">
        <MyReviewListSection />
      </div>
    </TransitionLayout>
  );
}
