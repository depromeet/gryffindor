"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserState } from "@/entities/user";
import { useReportForm } from "@/features/report/lib/hook/useReportForm";
import { FailureModal } from "@/features/report/ui/FailureModal";
import { LoginRequiredModal } from "@/features/report/ui/LoginRequiredModal";
import { ReportForm } from "@/features/report/ui/ReportForm";
import { SuccessModal } from "@/features/report/ui/SuccessModal";
import { TransitionLayout } from "@/shared/ui";

export default function ReportPage() {
  const router = useRouter();
  const {
    location,
    setLocation,
    name,
    setName,
    recommendedMenu,
    setRecommendedMenu,
    reason,
    setReason,
    seatTypes,
    setSeatTypes,
    category,
    setCategory,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    isFailureModalOpen,
    setIsFailureModalOpen,
    handleSubmit,
  } = useReportForm();

  const { userState } = useUserState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!userState.memberId) {
      setIsLoginModalOpen(true);
    }
  }, [userState.memberId]);

  return (
    <TransitionLayout>
      <ReportForm
        location={location}
        setLocation={setLocation}
        name={name}
        setName={setName}
        recommendedMenu={recommendedMenu}
        setRecommendedMenu={setRecommendedMenu}
        reason={reason}
        setReason={setReason}
        seatTypes={seatTypes}
        setSeatTypes={setSeatTypes}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
      />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      <FailureModal isOpen={isFailureModalOpen} onClose={() => setIsFailureModalOpen(false)} />
      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          router.back();
        }}
        setIsLoginModalOpen={setIsLoginModalOpen}
        text="식당 제보"
      />
    </TransitionLayout>
  );
}
