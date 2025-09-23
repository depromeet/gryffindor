import type { EmblaViewportRefType } from "embla-carousel-react";
import { HonbobLevelCard } from "@/entities/honbob";

interface HonbobCarouselSlideProps {
  ref: EmblaViewportRefType;
}

const honbobLevelCardList = [
  {
    honbobLevel: "Lv.1",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "혼자 먹기 좋은 식당부터 보여드려요",
    // honbobLevelIcon: "",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  {
    honbobLevel: "Lv.2",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "혼자 먹기 좋은 식당부터 보여드려요",
    // honbobLevelIcon: "",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  {
    honbobLevel: "Lv.3",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "혼자 먹기 좋은 식당부터 보여드려요",
    // honbobLevelIcon: "",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
  {
    honbobLevel: "Lv.4",
    honbobLevelTitle: "혼밥 입문자",
    honbobLevelDescription: "혼자 먹기 좋은 식당부터 보여드려요",
    // honbobLevelIcon: "",
    recommendedMenu: "간편식 및 즉석식, 패스트푸드",
    recommendedStore: "바 좌석 · 1-2인석",
  },
];

export function HonbobCarouselSlide({ ref }: HonbobCarouselSlideProps) {
  return (
    <div className="relative overflow-hidden rounded-[16px]" ref={ref}>
      <div className="flex h-[121px] flex-col flex-wrap rounded-[16px]">
        {honbobLevelCardList.map((honbobLevelCard) => (
          <div
            className="relative mx-1 h-44 w-full rounded-[16px]"
            key={honbobLevelCard.honbobLevel}
          >
            <HonbobLevelCard {...honbobLevelCard} />
          </div>
        ))}
      </div>
    </div>
  );
}
