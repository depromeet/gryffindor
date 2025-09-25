export type SeatTypes = "FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "CUBICLE" | "BAR_TABLE";

export interface StoreListResponse {
  id: number;
  name: string;
  thumbnailUrl: string;
  signatureMenu: { name: string; price: number };
  coordinate: { lat: number; lon: number };
  distance: number;
  walkingMinutes: number;
  seats: SeatTypes[];
  honbobLevel: number;
  tags?: string[];
}

export interface StoreListResponseReal {
  //실제 api 응답 StoreListResponse를 다른 곳에서 쓰고 있어 다른 이름으로 정의
  data: StoreListResponseData[];
  nextCursor: string;
  hasNext: boolean;
  metadata: Record<string, any>;
}

export interface StoreListResponseData {
  id: number;
  name: string;
  thumbnailUrl: string;
  signatureMenu: { name: string; price: number };
  coordinate: { lat: number; lon: number };
  distance: number;
  walkingMinutes: number;
  seats: SeatTypes[];
  tags?: string[]; //map 쪽의 mock 데이터와 충돌을 피하기 위해 옵셔널 값으로 제공
  honbobLevel: number;
}
export interface StoreListRequest {
  requestBody: StoreListRequestBody;
}

export interface StoreListRequestBody {
  bbox?: {
    nw: {
      lat: number;
      lon: number;
    };
    se: {
      lat: number;
      lon: number;
    };
  };
  center: {
    lat: number;
    lon: number;
  };
  filters: {
    price?: {
      min: number;
      max: number;
    };
    honbobLevel: number;
    seatTypes?: ("FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "BAR_TABLE" | "CUBICLE")[];
    paymentMethods?: string[];
    categories?: string[];
  };
  paging: {
    limit: number;
    lastKnown?: string;
  };
}
