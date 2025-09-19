"use client";

import { use } from "react";
import { MenuItem } from "@/entities/store/ui";
import { SeatImageGallery, SeatInfoSection, StoreInfo } from "@/features/store/ui";
import { TransitionLayout } from "@/shared/ui";

const MOCK_DATA = [
  {
    storeId: 1,
    thumbnails: [],
    level: 3,
    name: "진짜 맛있는 필앤필버거 역삼본점 두 줄이면 이렇게 보임",
    address: "서울시 마포구 와우산로 94",
    phone: "02-1234-5678",
    menus: [
      {
        name: "대표 메뉴 1",
        price: 12000,
        isRepresentative: true,
        imageUrl: "",
      },
      {
        name: "일반 메뉴 1",
        price: 9000,
        isRepresentative: false,
        imageUrl: "",
      },
      {
        name: "일반 메뉴 2",
        price: 8000,
        isRepresentative: false,
        imageUrl: "",
      },
    ],
    seatInfo: {
      cubicle: true,
      barTable: false,
      forOne: true,
      forTwo: true,
      forFour: false,
    },
    seatImages: [
      {
        imageUrl: "",
        seatType: "cubicle",
      },
      {
        imageUrl: "",
        seatType: "barTable",
      },
      {
        imageUrl: "",
        seatType: "forOne",
      },
      {
        imageUrl: "",
        seatType: "forTwo",
      },
      {
        imageUrl: "",
        seatType: "forFour",
      },
    ],
  },
];

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params);
  const store = MOCK_DATA.find((s) => s.storeId === Number(resolvedParams.id))!;

  return (
    <TransitionLayout>
      <StoreInfo {...store} />
      <div className="h-1 w-full bg-gray50"></div>
      <article className="mt-5 flex w-full flex-col gap-3 pl-5">
        <span className="text-[#000] text-subtitle1">혼밥 메뉴</span>
        <div className="flex flex-col gap-3">
          {store.menus.map((menu) => (
            <MenuItem key={menu.name} {...menu} />
          ))}
        </div>
      </article>
      <SeatInfoSection seatInfo={store.seatInfo} />
      <SeatImageGallery
        storeName={store.name}
        level={store.level}
        userName="홍길동"
        images={store.seatImages}
      />
    </TransitionLayout>
  );
}
