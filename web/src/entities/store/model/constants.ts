import type { SeatTypes } from "@/entities/storeList/api";

export const ALL_CATEGORIES = [
  "한식",
  "일식",
  "중식",
  "양식",
  "패스트푸드",
  "분식",
  "아시아음식",
  "카페",
  "기타",
] as const;

export const SEAT_TYPE_MAP: Record<SeatTypes, string> = {
  CUBICLE: "칸막이",
  BAR_TABLE: "바 좌석",
  FOR_ONE: "1인석",
  FOR_TWO: "2인석",
  FOR_FOUR: "4인석",
};
