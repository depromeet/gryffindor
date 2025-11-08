import { useState } from "react";
import type { SeatTypes } from "@/entities/storeList/api";
import { useUserState } from "@/entities/user";
import { useReportMutation } from "@/features/report/api/useReportMutation";

export const useReportForm = () => {
  const { userState } = useUserState();

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [recommendedMenu, setRecommendedMenu] = useState("");
  const [reason, setReason] = useState("");
  const [seatTypes, setSeatTypes] = useState<SeatTypes[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const { mutate: reportMutate } = useReportMutation({
    onSuccess: () => {
      setIsSuccessModalOpen(true);
    },
    onError: () => {
      setIsFailureModalOpen(true);
    },
  });

  const handleSubmit = () => {
    if (!userState.memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    reportMutate({
      location,
      name,
      seatType: seatTypes,
      paymentMethods: [],
      menuCategories: [],
      recommendedMenu,
      reason,
      memberId: userState.memberId,
    });
  };

  return {
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
  };
};
