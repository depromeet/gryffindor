import type { SeatTypes } from "@/entities/storeList/api";

export interface ReportRequestBody {
  location: string;
  name: string;
  seatType: SeatTypes[];
  paymentMethods: string[];
  menuCategories: string[];
  recommendedMenu: string;
  reason: string;
  memberId: number;
}
