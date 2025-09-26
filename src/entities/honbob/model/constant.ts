import { Lv1Character, Lv2Character, Lv3Character, Lv4Character } from "@/shared/lib/assets";

export const SAMPLE_LEVEL_INFO = {
  1: {
    level: "Lv.1 혼밥 입문자",
    description: "누구나 할 수 있는 혼밥의 첫걸음",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  2: {
    level: "Lv.2 혼밥 탐험가 ",
    description: "혼밥 전용석이 마련된 친절한 식당",
    recommendedMenu: "단품, 디저트/카페",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  3: {
    level: "Lv.3 혼밥 숙련자 ",
    description: "이제는 4인석도 두렵지 않아",
    recommendedMenu: "단품",
    recommendedStore: "4인석",
  },
  4: {
    level: "Lv.4 혼밥 고수",
    description: "최소 주문 단위가 2인분? 문제없지",
    recommendedMenu: "세트 메뉴 (2인 이상)",
    recommendedStore: "4인석",
  },
};

export const honbobLevelCardList = [
  {
    honbobLevel: "Lv.1",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "누구나 할 수 있는 혼밥의 첫걸음",
    honbobLevelIcon: Lv1Character,
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  {
    honbobLevel: "Lv.2",
    honbobLevelTitle: "혼밥 탐험가 ",
    honbobLevelDescription: "혼밥 전용석이 마련된 친절한 식당",
    honbobLevelIcon: Lv2Character,
    recommendedMenu: "단품, 디저트/카페",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  {
    honbobLevel: "Lv.3",
    honbobLevelTitle: "혼밥 숙련자 ",
    honbobLevelDescription: "이제는 4인석도 두렵지 않아",
    honbobLevelIcon: Lv3Character,
    recommendedMenu: "단품",
    recommendedStore: "4인석",
  },
  {
    honbobLevel: "Lv.4",
    honbobLevelTitle: "혼밥 고수",
    honbobLevelDescription: "최소 주문 단위가 2인분? 문제없지",
    honbobLevelIcon: Lv4Character,
    recommendedMenu: "세트 메뉴 (2인 이상)",
    recommendedStore: "4인석",
  },
];
