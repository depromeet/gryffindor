"use client";

import { useReportForm } from "@/features/report/lib/hook/useReportForm";
import { FailureModal } from "@/features/report/ui/FailureModal";
import { ReportForm } from "@/features/report/ui/ReportForm";
import { SuccessModal } from "@/features/report/ui/SuccessModal";
import { CTA, TransitionLayout } from "@/shared/ui";

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
      />
      <div className="fixed bottom-0 left-0 w-full bg-white">
        <CTA
          primaryLabel="제보하기"
          onPrimary={handleSubmit}
          primaryDisabled={
            !location || !name || !recommendedMenu || reason.length < 5 || seatTypes.length === 0
          }
        />
      </div>

      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      <FailureModal isOpen={isFailureModalOpen} onClose={() => setIsFailureModalOpen(false)} />
    </TransitionLayout>
  );
}
