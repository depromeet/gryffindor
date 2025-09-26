import type { EmblaViewportRefType } from "embla-carousel-react";
import { HonbobLevelCard, honbobLevelCardList } from "@/entities/honbob";

interface HonbobCarouselSlideProps {
  ref: EmblaViewportRefType;
}

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
