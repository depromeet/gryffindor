export interface Menu {
  imageUrl: string;
  name: string;
  price: number;
  isRepresentative: boolean;
}

export interface SeatInfo {
  cubicle: boolean;
  barTable: boolean;
  forOne: boolean;
  forTwo: boolean;
  forFour: boolean;
}

export interface SeatImage {
  imageUrl: string;
  seatType: string;
}

export interface StoreResponse {
  storeId: number;
  thumbnailUrls: string[];
  level: number;
  name: string;
  address: string;
  phone: string;
  menus: Menu[];
  seatInfo: SeatInfo;
  seatImages: SeatImage[];
}
