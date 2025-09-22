export const MOCK_DATA = [
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
