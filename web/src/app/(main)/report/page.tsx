"use client";

import { useReportForm } from "@/features/report/lib/hook/useReportForm";
import { FailureModal } from "@/features/report/ui/FailureModal";
import { ReportForm } from "@/features/report/ui/ReportForm";
import { SuccessModal } from "@/features/report/ui/SuccessModal";
import { TransitionLayout } from "@/shared/ui";

export default function ReportPage() {
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
    </TransitionLayout>
  );
}
