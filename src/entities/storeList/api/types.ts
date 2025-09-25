export type SeatTypes = "FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "CUBICLE" | "BAR_TABLE";

export interface StoreSearchResponse {
  id: number;
  name: string;
  thumbnailUrl: string;
  signatureMenu: { name: string; price: number };
  coordinate: { lat: number; lon: number };
  distance: number;
  walkingMinutes: number;
  seatTypes: SeatTypes[];
  honbobLevel: number;
}
